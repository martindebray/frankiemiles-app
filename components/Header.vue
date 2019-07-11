<template>
  <div
    id="header"
    :data-theme="menuTheme"
    :class="`${menuActive ? `trigger` : ``} ${scrolled ? `scrolled` : ``}`"
  >
    <div class="sup">
      <div @click="triggerMenu" id="burger">
        <svg
          class="icon"
          width="16px"
          height="6px"
          viewBox="0 0 16 6"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g
              id="Styles/Menu-Burger--black"
              transform="translate(0.000000, -4.000000)"
              fill="#090909"
              fill-rule="nonzero"
            >
              <g id="Group" transform="translate(0.000000, 4.000000)">
                <rect id="rect1" x="0" y="0" width="16" height="1.5" />
                <rect id="rect2" x="0" y="4" width="16" height="1.5" />
              </g>
            </g>
          </g>
        </svg>

        <span>Menu</span>
      </div>
      <div id="logo">
        <nuxt-link to="/">Frankie Miles</nuxt-link>
      </div>
      <div class="right">
        <div class="m-social">
          <div v-for="item in social.items">
            <a :href="item.url" :title="item.title" :class="item.title" target="_blank">
              <div v-if="item.title.toLowerCase() === `youtube`">
                <svg
                  width="20px"
                  height="14px"
                  viewBox="0 0 20 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="youtube" fill="#FFFFFF" fill-rule="nonzero">
                      <path
                        d="M19.4532258,2.19032258 C19.8709677,3.7483871 19.8709677,7 19.8709677,7 C19.8709677,7 19.8709677,10.2516129 19.4645161,11.8096774 C19.2274194,12.6790323 18.5612903,13.3564516 17.7032258,13.5822581 C16.1451613,14 9.93548387,14 9.93548387,14 C9.93548387,14 3.72580645,14 2.17903226,13.5822581 C1.32096774,13.3451613 0.64354839,12.6677419 0.41774194,11.8096774 C-1.77635684e-15,10.2516129 -1.77635684e-15,7 -1.77635684e-15,7 C-1.77635684e-15,7 -1.77635684e-15,3.7483871 0.40645161,2.19032258 C0.64354839,1.32096774 1.30967742,0.64354839 2.16774194,0.41774194 C3.72580645,0 9.93548387,0 9.93548387,0 C9.93548387,0 16.1451613,0 17.6919355,0.41774194 C18.55,0.65483871 19.2274194,1.33225806 19.4532258,2.19032258 Z M7.90322581,9.95806452 L13.0967742,7 L7.90322581,4.04193548 L7.90322581,9.95806452 Z"
                        id="Combined-Shape"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div v-else-if="item.title.toLowerCase() === `pinterest`">
                <svg
                  width="14px"
                  height="14px"
                  viewBox="0 0 14 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g
                      id="Navifinal/navi__medium--white"
                      transform="translate(-1083.000000, -25.000000)"
                      fill="#000000"
                    >
                      <g id="Group-20">
                        <path
                          d="M1090,25 C1086.13381,25 1083,28.1338125 1083,32 C1083,34.965375 1084.84494,37.4985 1087.44894,38.5183125 C1087.38769,37.9644375 1087.33256,37.1148125 1087.47344,36.5101875 C1087.60031,35.9641875 1088.29419,33.03075 1088.29419,33.03075 C1088.29419,33.03075 1088.08462,32.611625 1088.08462,31.9916875 C1088.08462,31.01825 1088.649,30.2915625 1089.35119,30.2915625 C1089.94837,30.2915625 1090.23713,30.74 1090.23713,31.2776875 C1090.23713,31.878375 1089.85475,32.776125 1089.65744,33.60825 C1089.4925,34.3051875 1090.00656,34.8735 1090.69387,34.8735 C1091.93812,34.8735 1092.8945,33.5614375 1092.8945,31.6679375 C1092.8945,29.991875 1091.69006,28.8198125 1089.97025,28.8198125 C1087.97875,28.8198125 1086.80975,30.313875 1086.80975,31.8578125 C1086.80975,32.459375 1087.04119,33.1046875 1087.33038,33.455125 C1087.38769,33.5246875 1087.396,33.5850625 1087.37894,33.6559375 C1087.326,33.8773125 1087.20788,34.3524375 1087.18469,34.45 C1087.15406,34.57775 1087.08319,34.6053125 1086.95062,34.543625 C1086.07606,34.1363125 1085.52962,32.858375 1085.52962,31.8315625 C1085.52962,29.6235 1087.13394,27.5956875 1090.15487,27.5956875 C1092.583,27.5956875 1094.47038,29.326 1094.47038,31.638625 C1094.47038,34.051 1092.94919,35.992625 1090.83781,35.992625 C1090.12863,35.992625 1089.46187,35.6238125 1089.2335,35.1885 C1089.2335,35.1885 1088.88262,36.5250625 1088.79731,36.85275 C1088.63937,37.4604375 1088.21281,38.2225625 1087.92712,38.687625 C1088.5825,38.890625 1089.27856,39 1090,39 C1093.86619,39 1097,35.86575 1097,32 C1097,28.1338125 1093.86619,25 1090,25"
                          id="Fill-11"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div v-else-if="item.title.toLowerCase() === `instagram`">
                <svg
                  width="14px"
                  height="14px"
                  viewBox="0 0 14 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g
                      id="Navifinal/navi__medium--white"
                      transform="translate(-1131.000000, -25.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <g id="Group-20">
                        <path
                          d="M1138.00001,25 C1136.09891,25 1135.86053,25.0080582 1135.11391,25.0421245 C1134.36884,25.0761072 1133.85999,25.1944504 1133.41473,25.367505 C1132.95442,25.5463669 1132.56405,25.78572 1132.17487,26.1748707 C1131.78572,26.5640491 1131.54637,26.9544222 1131.3675,27.414734 C1131.19445,27.8599856 1131.07611,28.3688407 1131.04212,29.113909 C1131.00806,29.8605334 1131,30.098914 1131,32.000014 C1131,33.901086 1131.00806,34.1394666 1131.04212,34.886091 C1131.07611,35.6311593 1131.19445,36.1400144 1131.3675,36.585266 C1131.54637,37.0455778 1131.78572,37.4359509 1132.17487,37.8251293 C1132.56405,38.21428 1132.95442,38.4536331 1133.41473,38.632523 C1133.85999,38.8055496 1134.36884,38.9238928 1135.11391,38.9578755 C1135.86053,38.9919418 1136.09891,39 1138.00001,39 C1139.90109,39 1140.13947,38.9919418 1140.88609,38.9578755 C1141.63116,38.9238928 1142.14001,38.8055496 1142.58527,38.632523 C1143.04558,38.4536331 1143.43595,38.21428 1143.82513,37.8251293 C1144.21428,37.4359509 1144.45363,37.0455778 1144.63252,36.585266 C1144.80555,36.1400144 1144.92389,35.6311593 1144.95788,34.886091 C1144.99194,34.1394666 1145,33.901086 1145,32.000014 C1145,30.098914 1144.99194,29.8605334 1144.95788,29.113909 C1144.92389,28.3688407 1144.80555,27.8599856 1144.63252,27.414734 C1144.45363,26.9544222 1144.21428,26.5640491 1143.82513,26.1748707 C1143.43595,25.78572 1143.04558,25.5463669 1142.58527,25.367505 C1142.14001,25.1944504 1141.63116,25.0761072 1140.88609,25.0421245 C1140.13947,25.0080582 1139.90109,25 1138.00001,25 Z M1138.00001,26.2612591 C1139.86908,26.2612591 1140.09048,26.2684003 1140.8286,26.3020776 C1141.51109,26.3331984 1141.88174,26.4472343 1142.1284,26.5430978 C1142.45514,26.6700825 1142.68833,26.8217693 1142.93326,27.0667354 C1143.17823,27.3116736 1143.32992,27.5448585 1143.4569,27.8716004 C1143.55277,28.1182614 1143.6668,28.4889062 1143.69792,29.1713992 C1143.7316,29.9095212 1143.73874,30.1309242 1143.73874,32.000014 C1143.73874,33.8690758 1143.7316,34.0904788 1143.69792,34.8286008 C1143.6668,35.5110938 1143.55277,35.8817386 1143.4569,36.1283996 C1143.32992,36.4551415 1143.17823,36.6883264 1142.93326,36.9332646 C1142.68833,37.1782307 1142.45514,37.3299175 1142.1284,37.4569022 C1141.88174,37.5527657 1141.51109,37.6668016 1140.8286,37.6979224 C1140.09059,37.7315997 1139.86921,37.7387409 1138.00001,37.7387409 C1136.13079,37.7387409 1135.90944,37.7315997 1135.1714,37.6979224 C1134.48891,37.6668016 1134.11826,37.5527657 1133.8716,37.4569022 C1133.54486,37.3299175 1133.31167,37.1782307 1133.06674,36.9332646 C1132.8218,36.6883264 1132.67008,36.4551415 1132.5431,36.1283996 C1132.44723,35.8817386 1132.3332,35.5110938 1132.30208,34.8286008 C1132.2684,34.0904788 1132.26126,33.8690758 1132.26126,32.000014 C1132.26126,30.1309242 1132.2684,29.9095212 1132.30208,29.1713992 C1132.3332,28.4889062 1132.44723,28.1182614 1132.5431,27.8716004 C1132.67008,27.5448585 1132.82177,27.3116736 1133.06674,27.0667354 C1133.31167,26.8217693 1133.54486,26.6700825 1133.8716,26.5430978 C1134.11826,26.4472343 1134.48891,26.3331984 1135.1714,26.3020776 C1135.90952,26.2684003 1136.13092,26.2612591 1138.00001,26.2612591 Z M1138.00001,28.4054075 C1136.01475,28.4054075 1134.40541,30.0147487 1134.40541,32.000014 C1134.40541,33.9852513 1136.01475,35.5945925 1138.00001,35.5945925 C1139.98525,35.5945925 1141.59459,33.9852513 1141.59459,32.000014 C1141.59459,30.0147487 1139.98525,28.4054075 1138.00001,28.4054075 Z M1138.00001,34.3333333 C1136.71133,34.3333333 1135.66667,33.2886705 1135.66667,32.000014 C1135.66667,30.7113295 1136.71133,29.6666667 1138.00001,29.6666667 C1139.28867,29.6666667 1140.33333,30.7113295 1140.33333,32.000014 C1140.33333,33.2886705 1139.28867,34.3333333 1138.00001,34.3333333 Z M1142.57662,28.2633907 C1142.57662,28.7273148 1142.20053,29.1033778 1141.73661,29.1033778 C1141.27271,29.1033778 1140.89662,28.7273148 1140.89662,28.2633907 C1140.89662,27.7994665 1141.27271,27.4233755 1141.73661,27.4233755 C1142.20053,27.4233755 1142.57662,27.7994665 1142.57662,28.2633907 Z"
                          id="Instagram"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div v-else-if="item.title.toLowerCase() === `facebook`">
                <svg
                  width="14px"
                  height="14px"
                  viewBox="0 0 14 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g
                      id="Navifinal/navi__medium--white"
                      transform="translate(-1107.000000, -25.000000)"
                      fill="#000000"
                    >
                      <g id="Group-20">
                        <path
                          d="M1120.41681,25 L1107.58362,25 C1107.26119,25 1107,25.2611875 1107,25.5831875 L1107,38.4168125 C1107,38.7388125 1107.26119,39 1107.58362,39 L1114.4375,39 L1114.4375,33.75 L1112.6875,33.75 L1112.6875,31.5625 L1114.4375,31.5625 L1114.4375,29.8125 C1114.4375,28.0043125 1115.58244,27.1144375 1117.1955,27.1144375 C1117.96813,27.1144375 1118.63225,27.1721875 1118.82562,27.1975625 L1118.82562,29.0875625 L1117.70694,29.088 C1116.82975,29.088 1116.625,29.5049375 1116.625,30.1165625 L1116.625,31.5625 L1118.8125,31.5625 L1118.375,33.75 L1116.625,33.75 L1116.66,39 L1120.41681,39 C1120.73881,39 1121,38.7388125 1121,38.4168125 L1121,25.5831875 C1121,25.2611875 1120.73881,25 1120.41681,25"
                          id="Fill-3"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </a>
          </div>
        </div>
        <nuxt-link to="/search">
          <svg
            class="search search-main"
            width="14px"
            height="14px"
            viewBox="0 0 14 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                transform="translate(-1186.000000, -25.000000)"
                fill="#FFFFFF"
                fill-rule="nonzero"
              >
                <path
                  d="M1199.82857,38.0057143 L1196.46286,34.64 C1197.29714,33.6228571 1197.8,32.32 1197.8,30.9 C1197.8,27.6428571 1195.15714,25 1191.9,25 C1188.64,25 1186,27.6428571 1186,30.9 C1186,34.1571429 1188.64,36.8 1191.9,36.8 C1193.32,36.8 1194.62,36.3 1195.63714,35.4657143 L1199.00286,38.8285714 C1199.23143,39.0571429 1199.6,39.0571429 1199.82857,38.8285714 C1200.05714,38.6028571 1200.05714,38.2314286 1199.82857,38.0057143 Z M1191.9,35.6257143 C1189.29143,35.6257143 1187.17143,33.5057143 1187.17143,30.9 C1187.17143,28.2942857 1189.29143,26.1714286 1191.9,26.1714286 C1194.50571,26.1714286 1196.62857,28.2942857 1196.62857,30.9 C1196.62857,33.5057143 1194.50571,35.6257143 1191.9,35.6257143 Z"
                  id="Shape"
                />
              </g>
            </g>
          </svg>
        </nuxt-link>
      </div>
    </div>

    <nav id="menu">
      <div v-for="item in menu.items" @click="triggerMenuMobile">
        <nuxt-link
          exact
          :to="`/${item.url.replace(`${url}/`, ``)}`"
          :class="`menu-link ${item.title === `Journal` ? `menu-link-parent` : ``}`"
        >{{ item.title }}</nuxt-link>

        <div v-if="item.title === `Journal`">
          <div class="menu-sub">
            <div class="menu-sub-header">
              <div @click="triggerMenuMobile" id="menu-sub-back">
                <svg
                  width="19px"
                  height="14px"
                  viewBox="0 0 19 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Mobile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g
                      id="0.0-Menu-Kategorie-(S)"
                      transform="translate(-16.000000, -16.000000)"
                      fill="#1E201D"
                      fill-rule="nonzero"
                    >
                      <g id="left-arrow" transform="translate(16.000000, 16.000000)">
                        <path
                          d="M5.93693393,0.210559595 C6.19351003,-0.0701865318 6.59744402,-0.0701865318 6.85402011,0.210559595 C7.1019281,0.481821056 7.1019281,0.933291179 6.85402011,1.20392033 L2.20386731,6.29212773 L17.5487359,6.29212773 C17.90644,6.29212773 18.2,6.60322479 18.2,6.99462536 C18.2,7.38602592 17.90644,7.70723996 17.5487359,7.70723996 L2.20386731,7.70723996 L6.85402011,12.7859627 C7.1019281,13.0667088 7.1019281,13.5188113 6.85402011,13.7894404 C6.59744402,14.0701865 6.19351003,14.0701865 5.93693393,13.7894404 L0.185930988,7.49668037 C-0.0619769962,7.22541891 -0.0619769962,6.77394878 0.185930988,6.50331963 L5.93693393,0.210559595 Z"
                          id="Shape"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span>Journal</span>
              <div>
                <svg
                  id="close-menu"
                  width="14px"
                  height="14px"
                  viewBox="0 0 14 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g id="Mobile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g
                      id="0.0-Menu-Kategorie-(S)"
                      transform="translate(-290.000000, -16.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <g id="cross-(1)" transform="translate(290.000000, 16.000000)">
                        <polygon
                          id="Shape"
                          points="14 0.811425783 13.1883889 0 7 6.18878051 0.811588235 0 0 0.811425783 6.18841176 7.00025213 0 13.1885971 0.811588235 14 7 7.81165499 13.1883889 14 14 13.1885971 7.81115359 7.00025213"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <nuxt-link to="/journal" class="menu-link--sub">Show all</nuxt-link>
            </div>
            <div v-if="category.count > 0" v-for="category in categories">
              <nuxt-link
                v-if="category.name !== `Uncategorized`"
                :to="`/category/${category.slug}`"
                class="menu-link--sub"
              >{{category.name}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="search-big">
        <svg
          class="search"
          width="14px"
          height="14px"
          viewBox="0 0 14 14"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-1186.000000, -25.000000)" fill="#FFFFFF" fill-rule="nonzero">
              <path
                d="M1199.82857,38.0057143 L1196.46286,34.64 C1197.29714,33.6228571 1197.8,32.32 1197.8,30.9 C1197.8,27.6428571 1195.15714,25 1191.9,25 C1188.64,25 1186,27.6428571 1186,30.9 C1186,34.1571429 1188.64,36.8 1191.9,36.8 C1193.32,36.8 1194.62,36.3 1195.63714,35.4657143 L1199.00286,38.8285714 C1199.23143,39.0571429 1199.6,39.0571429 1199.82857,38.8285714 C1200.05714,38.6028571 1200.05714,38.2314286 1199.82857,38.0057143 Z M1191.9,35.6257143 C1189.29143,35.6257143 1187.17143,33.5057143 1187.17143,30.9 C1187.17143,28.2942857 1189.29143,26.1714286 1191.9,26.1714286 C1194.50571,26.1714286 1196.62857,28.2942857 1196.62857,30.9 C1196.62857,33.5057143 1194.50571,35.6257143 1191.9,35.6257143 Z"
                id="Shape"
              />
            </g>
          </g>
        </svg>
        <form :action="`/search#${this.val}`" @submit="submitForm" ref="form">
          <input ref="search-field" type="text" class="search-field h2" placeholder="Suche" />
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      menu: [],
      social: [],
      menuActive: false,
      menuMobileActive: false,
      menuTheme: "dark",
      categories: [],
      url: "",
      val: "",
      scrolled: false
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      this.val = this.$refs["search-field"].value;

      setTimeout(() => {
        this.$refs["form"].submit();
      }, 10);
    },
    getMenu(url) {
      let data = null;

      const menu = axios.get(`${url}/wp-json/menus/v1/menus/main`).then(res => {
        this.menu = res.data;

        axios.get(`${url}/wp-json/wp/v2/categories`).then(res => {
          this.categories = res.data;
        });
      });

      const social = axios
        .get(`${url}/wp-json/menus/v1/menus/social`)
        .then(res => {
          this.social = res.data;
        });
    },
    triggerMenu() {
      this.menuActive = !this.menuActive;
    },
    triggerMenuMobile(event) {
      if (event.target.children.length > 1 || event.target.nodeName === "A") {
        this.menuMobileActive = !this.menuMobileActive;

        if (this.menuMobileActive === true) {
          event.target.classList.add("triggered");
        }
      } else {
        if (
          event.target.id === "menu-sub-back" &&
          document.querySelector(".triggered")
        ) {
          this.menuMobileActive = !this.menuMobileActive;
          document.querySelector(".triggered").classList.remove("triggered");
        } else if (event.target.id === "close-menu") {
          this.triggerMenu();
          this.menuMobileActive = !this.menuMobileActive;
          document.querySelector(".triggered").classList.remove("triggered");
        }
      }
    },
    handleScroll() {
      const _height = document.querySelector(".hero")
        ? document.querySelector(".hero").offsetHeight
        : 9999999999;

      const _headerHeight = document.getElementById("header").offsetHeight / 2;

      this.scrolled = window.scrollY > 77;
    }
  },
  mounted() {
    this.url = process.env.API;
    this.getMenu(this.url);
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
#header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 666;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  transform: translateY(0);
  transition: all 0.2s ease-in;

  /* padding-bottom: 76px; */

  &::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    height: 102px;
    transform: translateY(-100%);
    transition: all 0.2s ease-in;
  }

  .sup {
    max-width: 1280px;
    padding: 0 5.5%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 44px;
    margin-bottom: 32px;

    .right {
      display: flex;
    }
  }

  @media (max-width: $tabletDown) {
    &::before {
      height: 76px;
    }

    .sup {
      margin-top: 30px;
      margin-bottom: 16px;
      padding: 0 4.5%;
    }

    .m-social {
      display: none;
    }

    &.trigger {
      .m-social {
        display: flex;
        justify-content: center;
        position: fixed;
        bottom: 40px;
        left: 0;
        z-index: 99;
        width: 100%;
      }
    }
  }
}

#header.scrolled {
  transform: translateY(-100%);
}

#burger {
  display: flex;
  align-items: center;
  cursor: pointer;

  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.44px;
  text-transform: uppercase;

  .icon {
    display: inline-block;
    margin-right: 8px;
    width: 16px;
    height: 16px;

    rect {
      transition: 0.2s ease;
    }
  }

  @media (max-width: $tabletDown) {
    span {
      display: none;
    }
  }
}

#logo {
  font-family: "Gilda Display", serif;
  font-size: 36px;
  letter-spacing: -1.8px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: $tabletDown) {
    font-size: 28px;
  }
}

#menu {
  display: flex;
  opacity: 0;
  pointer-events: none;
  transition: all 0.1s ease-in;

  div {
    letter-spacing: 1.2px;

    &:not(:last-child) {
      margin-right: 26px;
    }
  }

  a {
    text-decoration: none;
    opacity: 0.5;

    &.nuxt-link-active,
    &:hover {
      opacity: 1;
    }
  }

  .menu-link {
    text-transform: uppercase;
  }

  .search-big {
    padding: 12px 14px !important;
    margin-top: 18px;
    background-color: rgba(105, 105, 105, 0.25);

    display: flex;
    align-items: center;

    form {
      margin-left: 11px;

      input {
        font-size: 12px;
        background: none;
        outline: none;
        border: none;
        color: $purewhite;

        &::-webkit-input-placeholder {
          color: $purewhite;
        }

        &:-ms-input-placeholder {
          color: $purewhite;
        }

        &::placeholder {
          color: $purewhite;
        }
      }
    }

    @media (min-width: $tablet) {
      display: none;
    }
  }

  @media (min-width: $tabletUp) {
    a {
      &:hover,
      &.nuxt-link-active {
        ~ div > .menu-sub {
          height: 75px;
          padding-top: 34px;
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  div a {
    position: relative;
    z-index: 1;
  }

  .menu-sub {
    display: flex;
    left: 0;
    right: 0;
    justify-content: center;
    width: 100%;
    position: absolute;
    transform: translateY(-16px);
    padding-top: 34px;
    z-index: -1;
    width: auto;

    overflow: hidden;
    height: 0;
    /* height: 75px; */
    background: rgba(255, 255, 255, 0);
    transition: all 0.1s ease;

    &:hover {
      @media (min-width: $tabletUp) {
        height: 75px;
        background: rgba(255, 255, 255, 1);
      }
    }
  }

  .menu-link--sub {
  }

  .menu-sub-header {
    position: absolute;
    top: 24px;
    left: 5.5%;
    right: 0;
    display: flex;
    justify-content: space-between;

    display: none;
  }

  #menu-sub-back {
    svg {
      pointer-events: none;
    }
  }

  @media (max-width: $tabletDown) {
    div {
      cursor: pointer;
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 1.05px;
    }

    .menu-link-parent {
      pointer-events: none;
    }

    .menu-sub {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      position: fixed;
      transform: translateY(0);
      padding: 0 22px;
      z-index: 1;
      background: white;
      height: 100%;
      transition: 0.3s ease;
      display: flex;
      flex-direction: column;
      text-align: center;
      height: 100vh;

      justify-content: flex-start;
      text-align: left;
      padding-top: 80px;

      font-family: HelveticaNeue;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 1.2px;

      transform: translateX(100%);

      > div {
        &:not(.menu-sub-header) {
          cursor: pointer;
          padding: 14px 0;
          margin-right: 0;
          border-bottom: 1px solid #c8c7cc;

          &:hover {
            border-bottom: 1px solid #000;
          }
        }
      }
    }

    .menu-sub-header {
      display: flex;
    }

    #menu-sub-back {
    }

    .triggered {
      z-index: 10;

      .menu-sub {
        transform: translateX(0);
      }
    }
  }
}

@media (max-width: $tablet) {
  #menu {
    .triggered {
      z-index: 10;

      ~ div .menu-sub {
        height: 75px;
      }
    }
  }
}

#header.trigger {
  &::before {
    height: 130px;
    transform: translateX(0);
  }

  #burger {
    .icon {
      transform: translateY(1px);
      /* transform: rotate(90deg); */

      rect {
        transform-origin: center;

        &#rect1 {
          transform: rotate(45deg) translate(0px, 1px);
        }

        &#rect2 {
          transform: rotate(-45deg) translate(1px, -2px);
        }
      }
    }
  }

  #menu {
    opacity: 1;
    pointer-events: initial;
  }

  @media (max-width: $tabletDown) {
    height: 100vh;

    #menu {
      position: fixed;
      top: 80px;
      height: calc(100vh - 80px);
      background: white;
      flex-direction: column;
      width: 100%;
      padding: 0 22px;

      > div {
        padding: 14px 0;
        margin-right: 0;
        border-bottom: 1px solid #c8c7cc;

        &:hover {
          border-bottom: 1px solid #000;
        }
      }

      a {
        opacity: 1;
      }
    }
  }
}

#header[data-theme="white"] {
  color: $purewhite !important;

  a {
    color: $purewhite !important;
  }

  #burger {
    .icon {
      g {
        fill: $purewhite;
      }
    }
  }

  #logo {
    a {
      color: $purewhite;
    }
  }

  #menu {
    a {
      color: $purewhite;
    }
  }

  .search-main {
    g {
      fill: $purewhite;
    }
  }

  .m-social {
    svg {
      g,
      path {
        fill: $purewhite !important;
      }

      polygon {
        fill: $pureblack !important;
      }
    }

    .facebook {
      &:hover {
        svg path {
          fill: #3b5998 !important;
        }
      }
    }

    .instagram {
      &:hover {
        svg path {
          fill: #e1306c !important;
        }
      }
    }

    .youtube {
      &:hover {
        svg path {
          fill: #ff0000 !important;
        }
      }
    }

    .pinterest {
      &:hover {
        svg path {
          fill: #bd081c !important;
        }
      }
    }
  }
}

#header[data-theme="dark"],
#header.trigger {
  color: $pureblack !important;

  a {
    color: $pureblack !important;
  }

  #burger {
    .icon {
      g {
        fill: $pureblack;
      }
    }
  }

  #logo {
    a {
      color: $pureblack;
    }
  }

  #menu {
    a {
      color: $pureblack;
    }
  }

  .search-main {
    g {
      fill: $pureblack;
    }
  }

  .m-social {
    svg {
      g,
      path {
        fill: $pureblack !important;
        transition: 0.1s ease;
      }

      polygon {
        fill: $purewhite !important;
      }
    }

    .facebook {
      &:hover {
        svg path {
          fill: #3b5998 !important;
        }
      }
    }

    .instagram {
      &:hover {
        svg path {
          fill: #e1306c !important;
        }
      }
    }

    .youtube {
      &:hover {
        svg path {
          fill: #ff0000 !important;
        }
      }
    }

    .pinterest {
      &:hover {
        svg path {
          fill: #bd081c !important;
        }
      }
    }
  }
}
</style>

