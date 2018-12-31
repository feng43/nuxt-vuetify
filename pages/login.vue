<template>
  <v-layout
  	column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <v-card>
        <v-card-title class="headline">Welcome</v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
				    <v-text-field
				      v-model="name"
				      :counter="11"
				      label="姓名"
				      required
				    ></v-text-field>
				    <v-text-field
				      v-model="password"
				      label="密码"
				      required
				    ></v-text-field>
				  </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
			      :disabled="!valid"
			      @click="submit"
			    >
			      提交
			    </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
	layout: 'blank',
	data() {
		return {
			valid: true,
			name: '',
			password: ''
		}
	},
	methods: {
		submit() {
			if (this.$refs.form.validate()) {
				let param = new FormData()
				param.append('userName', this.name)
				param.append('password', this.password)
				// let param = {
				// 	userName: this.name,
				// 	password: this.password
				// }
				this.$store.dispatch('doLogin', param).then(res => {
					console.log(res)
					this.$store.commit('SAVE_USER', res.data.realName)
					this.$router.push('/')
				})
			}
		}
	}
}
</script>
