<template>
  <div class="wrap" id="sorting">
    <div class="text">
      <h1>{{$nuxt._route.name}}</h1>

      <div>
        <ul :class="sortType">
          <li class="chrono" @click="sort('chrono')">Chronological</li>
          <li class="alpha" @click="sort('alpha')">Alphabetical</li>
        </ul>
      </div>
    </div>

    <ProssGrid :type="$nuxt._route.name" :sort="sortType" :key="key" />
  </div>
</template>

<script>
import ProssGrid from "~/components/ProssGrid";

export default {
  components: {
    ProssGrid
  },
  data() {
    return {
      sortType: "chrono",
      key: 0,
      page: []
    };
  },
  async asyncData({ params, $axios }) {
    let page = await $axios.$get(
      `${process.env.API}/wp-json/wp/v2/pages?slug=${$nuxt._route.name}`
    );

    typeof page[0] !== `undefined` ? (page = page[0]) : (page = page);

    return {
      page
    };
  },
  methods: {
    sort(type) {
      this.sortType = type;
      this.key = this.key + 1;
    }
  },
  mounted() {
    this.sortType = "chrono";
  },
  head() {
    return {
      title: `${$nuxt._route.name} - Frankie Miles`,
      meta: [
        {
          hid: "description",
          id: "description",
          name: "description",
          content: $nuxt._route.name
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 0.8px;
  text-transform: capitalize;
}

#sorting {
  padding: 0 3.7% 130px;

  h2 {
    font-size: 24px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.8px;
  }

  .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    list-style: none;

    li {
      margin: 0 12px;
      float: left;
      cursor: pointer;

      font-family: $sans;
      font-size: 16px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;

      &:last-child {
        margin-right: 0;
      }

      &::before {
        content: "";
        width: 12px;
        height: 12px;
        background: $purewhite;
        display: inline-block;
        border: 1px solid $pureblack;
        border-radius: 100%;
        vertical-align: middle;
        margin-right: 10px;
        transform: translateY(-1.5px);
      }

      &:hover {
        &::before {
          background: $pureblack;
        }
      }
    }
  }

  .alpha {
    .alpha {
      &::before {
        background: $pureblack;
      }
    }
  }

  .chrono {
    .chrono {
      &::before {
        background: $pureblack;
      }
    }
  }

  @media (max-width: $tablet) {
    padding: 0 4% 80px;

    .text {
      flex-direction: column;

      > div {
        width: min-content;
      }
    }

    ul {
      margin-top: 24px;
      padding-left: 0;
      display: flex;

      li {
        width: max-content;

        &:last-child {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>

