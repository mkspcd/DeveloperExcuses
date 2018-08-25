new Vue({
  el: "#app",
  data() {
    return {
      quote: String,
      author: String,
      quotes: Array,
      dropboxURI: 'https://dl.dropboxusercontent.com/s/5kminh6mr9wnhe6/quotes.json?dl=1',
      githubURI: 'https://raw.githubusercontent.com/mkspcd/DeveloperExcuses/master/quotes.json',
      isFetching: true
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
      const randomIndex = Math.floor(Math.random() * this.quotes.length)

      this.quote = this.quotes[randomIndex].text
      this.author =
        this.quotes[randomIndex].author !== '' ?
        this.quotes[randomIndex].author :
        'Anonyme'
    },
    addQuotationMarks: quote => '« ' + quote + ' »'
  }
})
