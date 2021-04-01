<template>
	<v-app>
		<!-- FIXME Abhishek-->
		<v-container fluid class="mainContainer">
			<v-row>
				<v-col>
					<div class="carouselContainer" style="height:300px;">
						<v-carousel cycle height="100%" show-arrows-on-hover>
							<v-carousel-item
								v-for="(slide, i) in slides"
								:key="i"
							>
								<v-img
									src="https://picsum.photos/200"
									style="height:300px;"
								/>>
								<!-- <v-img
						src="./public/hostelImages/" + {images[i]}
					/>height="100%"> -->
								<v-row
									class="fill-height"
									align="center"
									justify="center"
								>
									<div class="display-3">
										{{ slide }} Slide
									</div>
								</v-row>
							</v-carousel-item>
						</v-carousel>
					</div>
				</v-col>
				<v-col>
					<v-card class="noticeCard mx-auto " outlined>
						<h3>Notices</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum.
						</p>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
export default {
	name: "DashBoard",
	data() {
		return {
			imagesHostel: ["img1", "img2", "img3", "img4", "img5"],
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
	padding: 10px 10px;
	box-sizing: border-box;
}

.noticeCard {
	margin: 0px;
	width: 100%;
	padding: 20px;
}
.mainContainer {
	max-height: 30px;
}
</style>
