<template>
    <div class="list row col-md-10">
        <div class="col-md-12">
            <br /><br />
            <h3>Amazon Review Scrapper</h3>

            <div class="search">
              <input type="text" class="col-md-2 input-search" required v-model="asin" placeholder="ASIN">
              <button v-on:click="search" class="btn btn-success button-search" style="">Search</button>
            </div>
            
            <div v-for="(review, index) in reviews" :key="index">
              <div class="row">
                <div class="col-md-3 coldata">
                  Date : {{ review.date | formatDate}}
                </div>
                <div class="col-md-3 coldata">
                  <a v-bind:href="review.authorLink" target="_blank">
                   Author: {{ review.author }}
                  </a>
                </div>
                <div class="col-md coldata">
                   Verified: {{ review.verified | formatBoolean }}
                </div>
                <div class="col-md coldata">
                   Photo : {{ review.pictureIncluded  | formatBoolean }}
                </div>
                <div class="col-md coldata">
                   Rating: {{ review.rating }}
                </div>
                <div class="col-md-2 coldata">
                  Comment Count:  {{ review.commentCount }}
                </div>
              </div>
              <div class="row col-md-12 ">
                <div class="title">
                  <a v-bind:href="review.reviewLink" target="_blank">
                   {{ review.title }}
                  </a>
                </div>
                <p class="content"> {{ review.body }} </p>
              </div>
            </div>

        </div>
    </div>
</template>

<script>
import http from "./http-common";

export default {
  name: "app",
  data() {
    return {
      asin: 'B003BEDQL2', //default
      reviews: []
    };
  },
  methods: {
    /* eslint-disable */
    getList(asin) {
      http
        .get("/review/" + asin)
        .then(response => {
          this.reviews = response.data.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))
        })
        .catch(e => {
          console.log(e);
        });
    },
    search() {
      this.getList(this.asin);
    }
  },
  mounted() {
    this.getList("B003BEDQL2");
  }
};
</script>

<style>
.search {
  margin : 60px;
}
.input-search {
  padding:5px;vertical-align: middle;
}
.button-search {
  margin-left:20px
}
.list {
  text-align: center;
  margin: auto;
}
.coldata {
  text-align: left;
}
.title {
  text-align:left;
  margin-top:20px;
  margin-bottom:10px;
}
.content {
  text-align:left;
  margin-bottom:40px;
}
</style>
