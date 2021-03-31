<template>
	<v-app id="login-app">
		<v-container class="d-flex justify-center">
			<v-card class="login-card" outlined>
				<span>Login into Hostel Site</span>
				<v-form id="login">
					<v-radio-group class="d-flex" v-model="person" row dense>
						<v-radio label="Student" value="student" />
						<v-radio label="Admin" value="admin" />
					</v-radio-group>
					<v-text-field
						label="Username"
						class="width-set"
						outlined
						:disabled="isAdmin"
						v-model="username"
					/>
					<v-text-field
						label="Password"
						type="password"
						class="width-set"
						outlined
						v-model="password"
					/>
					<v-btn
						color="success"
						depressed
						outlined
						:loading="isLoading"
						@click="submitActions()"
						>Login</v-btn
					>
				</v-form>
			</v-card>
		</v-container>
	</v-app>
</template>

<script>
export default {
	name: "loginCard",
	data() {
		return {
			person: "student",
			isAdmin: false,
			isLoading: false,
			username: "",
			password: "",
		};
	},

	methods: {
		async submitActions() {
			this.isLoading = true;
			const payload = {
				uname: this.username,
				utype: this.person,
				upass: this.password,
			};
			await this.$store
				.dispatch("loginUser", payload)
				.then(() => {
					this.$router.push("/");
				})
				.catch(() => {
					this.isLoading = false;
				});
		},
	},

	watch: {
		person: function() {
			if (this.person === "admin") {
				this.isAdmin = true;
				this.username = "admin";
			} else {
				this.isAdmin = false;
				this.username = "";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login-card {
	width: max-content;
	padding: 30px;
	overflow: hidden;

	#login {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
.width-set {
	width: 300px;
}
</style>
