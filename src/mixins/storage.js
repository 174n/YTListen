export default {
  data () {
    return {
      dbVar: "ytlisten__database"
    }
  },
  methods: {
    test: function() {
      console.log("success");
    },
    dbGet: function() {
      if(localStorage.getItem(dbVar) === null)
        dbSet({"playlists":[],"quality":15});
      return JSON.parse(localStorage.getItem(dbVar));
    },

    dbSet: function(obj) {
      localStorage.setItem(dbVar, JSON.stringify(obj));
    },

    dbAssign: function(obj) {
      let data = this.dbGet();
      let edited = Object.assign(data, obj);
      localStorage.setItem(dbVar, JSON.stringify(edited) );
    },

    dbClear: function() {
      localStorage.removeItem(dbVar);
    }
  }
};