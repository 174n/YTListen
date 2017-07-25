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
    dbInit: function() {
      if(localStorage.getItem(this.dbVar) === null)
        this.dbSet({"playlists":[],"quality":15});
    },
    dbGet: function() {
      this.dbInit();
      return JSON.parse(localStorage.getItem(this.dbVar));
    },

    dbSet: function(obj) {
      localStorage.setItem(this.dbVar, JSON.stringify(obj));
    },

    dbAssign: function(obj) {
      let data = this.dbGet();
      let edited = Object.assign(data, obj);
      this.dbSet(edited);
    },

    dbClear: function() {
      localStorage.removeItem(this.dbVar);
    }
  }
};