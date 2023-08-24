Vue.component('Administrator', {
  data() {
    return {
      korisnici: [], // Lista svih korisnika
      searchQuery: '', // Pretraga po imenu, prezimenu ili korisničkom imenu
      selectedRole: '', // Filtriranje po ulozi
      selectedUserType: '', // Filtriranje po tipu korisnika
      sortParam: '', // Sortiranje po imenu, prezimenu, korisničkom imenu ili broju bodova
      sortOrder: 'asc', // Redosled sortiranja (rastući ili opadajući)
    };
  },
  template: `
<div class="admin-panel">
  <h2 class="panel-title">Administrator Panel - User Management</h2>

  <!-- Search section -->
  <div class="search-section">
    <h3 class="section-title">Search Users</h3>
    <div class="search-input">
      <input type="text" v-model="searchQuery" placeholder="Search by name, surname, or username" />
      <button class="search-button" @click="searchUsers">Search</button>
    </div>
  </div>

  <!-- Filter section -->
  <div class="filter-section">
    <h3 class="section-title">Filter Users</h3>
    <div class="filter-input">
      <label for="uloga">Role:</label>
      <select id="uloga" v-model="selectedRole">
        <option value="">All</option>
        <!-- Add role options dynamically based on your available roles -->
        <option value="Kupac">Kupac</option>
        <option value="Menadzer">Menadzer</option>
        <option value="Administrator">Administrator</option>
      </select>

      <label for="userType">User Type:</label>
      <select id="userType" v-model="selectedUserType">
        <option value="">All</option>
        <!-- Add user type options dynamically based on your available user types -->
        <option value="Zlatni">Zlatni</option>
        <option value="Srebrni">Srebrni</option>
        <option value="Bronzani"> Bronzani</option>
      </select>

      <button class="filter-button" @click="filterUsers">Filter</button>
    </div>
  </div>

  <!-- Sort section -->
  <div class="sort-section">
    <h3 class="section-title">Sort Users</h3>
    <div class="sort-input">
      <label for="sortParam">Sort Parameter:</label>
      <select id="sortParam" v-model="sortParam">
        <option value="">None</option>
        <option value="ime">FirstName</option>
        <option value="prezime">LastName</option>
        <option value="korisnickoIme">Username</option>
        <option value="brojBodova">Points</option>
      </select>

      <label for="sortOrder">Sort Order:</label>
      <select id="sortOrder" v-model="sortOrder">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button class="sort-button" @click="sortUsers">Sort</button>
    </div>
  </div>

  <!-- Users table -->
  <div class="users-table">
    <h3 class="section-title">Users</h3>
    <table>
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Username</th>
          <th>Role</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="korisnik in filteredUsers" :key="korisnik.Id">
          <td>{{ korisnik.ime }}</td>
          <td>{{ korisnik.prezime }}</td>
          <td>{{ korisnik.korisnickoIme }}</td>
          <td>{{ korisnik.uloga }}</td>
          <td>{{ korisnik.brojBodova }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

  `,
  methods: {
    searchUsers() {
      // Implement search logic based on the searchQuery
      // Example:
      this.korisnici = this.korisnici.filter(korisnik =>
        korisnik.ime.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        korisnik.prezime.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        korisnik.korisnickoIme.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filterUsers() {
      // Implement filtering logic based on the selectedRole and selectedUserType
      // Example:
      this.korisnici = this.korisnici.filter(korisnik =>
        (this.selectedRole === '' || korisnik.uloga === this.selectedRole) &&
        (this.selectedUserType === '' || korisnik.tipKorisnika === this.selectedUserType)
      );
    },
   sortUsers() {
  this.korisnici.sort((a, b) => {
    if (this.sortParam === 'Id') {
      return (a.Id - b.Id) * (this.sortOrder === 'asc' ? 1 : -1);
    } else if (this.sortParam === 'ime') {
      return a.ime.localeCompare(b.ime) * (this.sortOrder === 'asc' ? 1 : -1);
    } else if (this.sortParam === 'prezime') {
      return a.prezime.localeCompare(b.prezime) * (this.sortOrder === 'asc' ? 1 : -1);
    } else if (this.sortParam === 'korisnickoIme') {
      return a.korisnickoIme.localeCompare(b.korisnickoIme) * (this.sortOrder === 'asc' ? 1 : -1);
    } else   if (this.sortParam === 'brojBodova') {
      return (a[this.sortParam] - b[this.sortParam]) * (this.sortOrder === 'asc' ? 1 : -1);
    }
    
  });


    },
  },
mounted() {
  axios
    .get('korisnik.txt')
    .then(response => {
      const data = response.data.split('\n');
      
      console.log('Fetched data:', data);

      const users = [];
      for (const line of data) {
        console.log('Line:', line);
        const [Id, korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga, ...rest] = line.split(';');
        console.log('Split values:', [Id, korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga, ...rest]);
        
        const user = {
          Id: parseInt(Id.trim()),
          korisnickoIme: korisnickoIme.trim(),
          lozinka: lozinka.trim(),
          ime: ime.trim(),
          prezime: prezime.trim(),
          pol: pol.trim(),
          datumRodjenja: datumRodjenja.trim(),
          uloga: uloga.trim(),
        };
        
        // Check if there are extra fields for points
        if (rest.length > 0) {
          user.brojBodova = parseInt(rest[0].trim());
        }
        
        users.push(user);
      }

      this.korisnici = users;
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
},


   computed: {
    filteredUsers() {
      let filtered = this.korisnici;

      // Apply search query filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (korisnik) =>
            korisnik.ime.toLowerCase().includes(query) ||
            korisnik.prezime.toLowerCase().includes(query) ||
            korisnik.korisnickoIme.toLowerCase().includes(query)
        );
      }

      // Apply role filter
      if (this.selectedRole) {
        filtered = filtered.filter((korisnik) => korisnik.uloga === this.selectedRole);
      }

      // Apply user type filter
      if (this.selectedUserType) {
        filtered = filtered.filter((korisnik) => korisnik.userType === this.selectedUserType);
      }

      // Apply sorting
      if (this.sortParam) {
  const sortOrder = this.sortOrder === 'asc' ? 1 : -1;
  filtered = filtered.sort((a, b) => {
    if (typeof a[this.sortParam] === 'string' && typeof b[this.sortParam] === 'string') {
      return a[this.sortParam].localeCompare(b[this.sortParam]) * sortOrder;
    } else if (typeof a[this.sortParam] === 'number' && typeof b[this.sortParam] === 'number') {
      return (a[this.sortParam] - b[this.sortParam]) * sortOrder;
    } else {
      return 0;
    }
  });
}


      return filtered;
    },
  },
});
