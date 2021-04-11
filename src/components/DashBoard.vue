<template>
  <v-app>
    <!-- TODO: fix this Abhishek! -->
    <v-container class="mainContainer">
      <v-row class="upperPart">
        <v-col style="width: 50%">
          <div class="carouselContainer">
            <v-carousel cycle show-arrows-on-hover>
              <v-carousel-item
                v-for="(hostelImage, i) in hostelImages"
                :key="i"
              >
                <v-img
                  :src="hostelImageLocation + hostelImage"
                  class="hostelImages"
                />>
                <v-row class="fill-height" align="center" justify="center">
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-col>
        <v-col>
          <v-card
            class="noticeCard mx-auto"
            outlined
            style="height: 500px; overflow: auto"
          >
            <h3>Notices</h3>
            <v-divider style="margin: 10px 0px" />
            <v-expansion-panels>
              <v-expansion-panel v-for="(notice, i) in notices" :key="i">
                <v-expansion-panel-header>
                  {{ i + 1 }}. {{ notice }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <div class="dtuInfo">
          <v-card class="infoCard mx-auto d-flex" outlined>
            <div class="logo">
              <v-img
                src="https://upload.wikimedia.org/wikipedia/en/b/b5/DTU%2C_Delhi_official_logo.png"
                class="dtuLogo"
              />
            </div>
            <div class="dtuInfoText">
              <h3>Delhi Technological University</h3>
              <span
                >Delhi Technological University (DTU), formerly known as the
                Delhi College of Engineering (DCE) is a state university in New
                Delhi, India. The DTU campus is well connected by road.The
                campus has an auditorium and two open-air theatres out of which
                one is called the OAT (Open-air Theatre) and the other is called
                the Mini OAT (Mini open-air theatre).Facilities include a
                library, a computer centre, a sports complex, eight boys'
                hostels, six girls' hostels. The 8 boys hostel are
                Bhaskaracharya Hostel, Sir C. V. Raman Hostel, Sir J.C. Bose
                Hostel, Varahmihir Hostel, Sir Vishveshwarya Hostel, Homi
                Jehangir Bhabha Hostel, Aryabhatt Hostel and Ramanujam Hostel.
                The 6 girls hostel are Sister Nivedita Hostel, Kalpana Chawla
                Hostel, Type – III Block 1 Girls Hostel, Type – III Block 2
                Girls Hostel, Type – II Block – 1 Girls Hostel and Type – II
                Block – 2,3,4 Girls Hostel. Each hostel is provided with
                facilities of : Solar water geysers, T.V. with cable connection,
                Table Tennis, Carom, Chess, Badminton Court, Gymnasium, Reading
                Room and LAN.</span>
              
            </div>
            
            
          </v-card>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// import imgone from "img1.jpg";
//  import DtuInfo from "@/components/DtuInfo.vue";
export default {
  name: "DashBoard",
  data() {
    return {
      selectedItem: 1,
      notices: [
        "Notice1",
        "Notice2",
        "Notice3",
        "Notice4",
        "Notice5",
        "Notice6",
        "Notice7",
        "Notice8",
      ],
      hostelImageLocation: "assets/hostelImages/",
      img: "img1.jpg",
      hostelImages: [
        "img1.jpg",
        "img2.jpg",
        "img3.jpg",
        "img4.jpg",
        "img5.jpg",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  
};
</script>

<style>
.carouselContainer {
  height: 100%;
  width: 100%;
  margin: 0px;
  /* padding: 10px 10px; */
  box-sizing: border-box;
}

.noticeCard {
  margin: 0px;
  width: 100%;
  padding: 20px;
  text-align: left;
}
.mainContainer {
  max-height: 30px;
}

.noticesText {
  padding-left: 0;
}
.hostelImages {
  width: 100%;
  height: 100%;
}
.dtuLogo {
  height: 100%;
  width: 100%;
  /* position: absolute; */
}
.infoCard {
  margin-top: 30px;
}
.logo {
  padding: 20px;
  max-width: 100%;
}
.dtuInfo {
  padding-top: 50px;
}
.dtuInfoText {
  text-align: left;
  padding: 20px;
}
</style>
