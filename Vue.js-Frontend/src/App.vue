<template>
    <div class="list row col-md-10">
        <div class="col-md-12">
            <br /><br />
            <h3>Amazon Review Scrapper</h3>

            <div class="row navigation col-md-12">
              <div class="search col-md-6">
                <input type="text" class="col-md-2 input-search" v-model="asin" placeholder="ASIN">
                <span v-on:click="search" class="btn btn-success button-search" style="">Search</span>
              </div>

              <div class="section-pagination col-md-6">
                <span v-on:click="prev" class="btn btn-success btn-pagination">Prev</span>
                Page <input type="number" class="col-md-2 input-page" v-model="pageNumber" min="1">
                <span v-on:click="goPage" class="btn btn-success btn-pagination">Go</span>
                <span v-on:click="next" class="btn btn-success btn-pagination">Next</span>
              </div>
            </div>

            <div v-for="(review, index) in reviews" :key="index" class="col-md-12">
              <div class="row col-md-12">
                <div class="col-md-3 coldata">
                  Date : {{ review.date | formatDate}}
                </div>
                <div class="col-md-3 coldata">
                  <a v-bind:href="review.authorLink" target="_blank">
                   Author: {{ review.author }}
                  </a>
                </div>
                <div class="col-md coldata" style="text-align: right;">
                   Verified: {{ review.verified | formatBoolean }}
                </div>
                <div class="col-md coldata" style="text-align: right;">
                   Photo : {{ review.pictureIncluded  | formatBoolean }}
                </div>
                <div class="col-md coldata" style="text-align: right;">
                   Rating: {{ review.rating }}
                </div>
                <div class="col-md-2 coldata" style="text-align: right;">
                  Comment Count:  {{ review.commentCount }}
                </div>
              </div>
              <div>
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
      reviews: [],
      pageNumber : 1
    };
  },
  methods: {
    /* eslint-disable */
    getList() {
      this.reviews = [];
      http
        .get("/review/" + this.asin + "?pageNumber=" + this.pageNumber)
        .then(response => {
          this.reviews = response.data.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))
        })
        .catch(e => {
          console.log(e);
        });
    },
    search() {
      this.pageNumber = 1;
      this.getList();
    },
    prev() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.getList();
      }
    },
    next() {
      this.pageNumber++;
      this.getList();
    },
    goPage() {
      if (this.pageNumber >= 1) {
        this.getList();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList();
    })
    
  }
};
</script>

<style>

.list {
  text-align: center;
  margin: auto;
}
.coldata {
  text-align: left;
  font-size: 13px;
}
.title {
  font-size: 20px;
  text-align:left;
  margin-top:15px;
  margin-bottom:10px;
}
.content {
  font-size: 15px;
  text-align:justify;
  margin-bottom:80px;
}
.col-md,
.col-md-2,
.col-md-3 {
  padding-right: 0px;
  padding-left: 0px;
}

.navigation {
  margin : 60px 0px;
}
.search {
  text-align: left;
  padding-left: 0px;
}
.input-search {
  min-width: 200px !important;
  padding:5px;
}
.button-search {
  margin-left:20px
}

.section-pagination {
  text-align: right;
}
.input-page {
  padding:5px;
  vertical-align: middle;
  margin-right: 20px;
  width: 70px;
}
.btn-pagination {
  margin-right:10px;
  cursor: pointer;
  width: 70px;
}
</style>
