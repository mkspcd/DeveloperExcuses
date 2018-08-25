new Vue({
  el: "#app",
  data() {
    return {
      quote: String,
      author: String,
      quotes: Array,
      dropboxURI: 'https://dl.dropboxusercontent.com/s/5kminh6mr9wnhe6/quotes.json?dl=1',
      githubURI: 'https://raw.githubusercontent.com/mkspcd/DeveloperExcuses/master/quotes.json',
      isFetching: true,
      previousIndex: Number,
      index: Number
    }
  },
  created() {
    fetch(this.dropboxURI)
      .then(response => response.json())
      .then(source => {
        this.init(source.quotes)
      })
      .catch(() => {
        fetch(this.githubRequest)
          .then(response => response.json())
          .then(source => {
            this.init(source.quotes)
          })
          .catch(() => {
            this.init(['404'])
          })
      })
  },
  methods: {
    init(data) {
      this.quotes = data
      this.randomQuote()
      this.isFetching = false
    },
    randomQuote() {
      this.drawNewIndex()

      this.quote = this.quotes[this.index].text
      this.author =
        this.quotes[this.index].author !== '' ?
        this.quotes[this.index].author :
        'Anonyme'
    },
    drawNewIndex() {
      this.previousIndex = this.index
      do {
        this.index = Math.floor(Math.random() * this.quotes.length)
      } while (this.index === this.previousIndex)
      
      
    },
    addQuotationMarks: quote => '« ' + quote + ' »'
  }
})
