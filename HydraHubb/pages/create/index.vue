<template>
  <v-form
    ref="form"
  >
    <input 
      type="file"
      @change="onFileSelected"
    >
    <v-select
      v-model="Choice"
      :items="items"
      label="Item"
      required
    />
    <v-btn
      color="success"
      @click="onUpload"
    >
      upload
    </v-btn>
    <v-text-field
      v-model="title"
      label="Title"
      required
    />

    <v-textarea
      v-model="description"
      label="Description"
      required
    />
    <v-btn
      color="success"
      @click="AddCreation"
    >
      Submit
    </v-btn>

  </v-form>
</template>

<script>
import slugify from 'slugify'
import { db } from '@/firebase/init.js'
import { storage } from '@/firebase/init.js'
export default {
  data() {
    return {
      Choice: '',
      uploadProgress: '',
      title: '',
      isUploaded: false,
      items: ['Image', 'Video'],
      description: '',
      another: '',
      authors: [],
      slug: '',
      selectedFile: '',
      imageurl: []
    }
  },
  methods: {
    // we are setting our selectedFile property to be equal to the information of the file that is accessible by our event that has access to it when the input was changed and the onFileSelected was initiated
    onFileSelected(event) {
      console.log(event.target.files[0])
      this.selectedFile = event.target.files[0]
      console.log('onFileSelected Console Log HERE!' + this.selectedFile)
    },
    onUpload() {
      console.log('This is the File!!' + this.selectedFile)
      console.log('What is the choice we made' + this.Choice)
      const storageRef = storage.ref()
      const uploadTask = storageRef
        .child(`${this.Choice}/` + this.selectedFile.name)
        .put(this.selectedFile)
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          this.uploadProgress = progress
        },
        error => {
          console.log(error.message)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            this.imageurl.push(url)
            console.log('Image URL' + url)
            this.isUploaded = true
          })
        }
      )
    },

    AddCreation() {
      if (this.title) {
        //  create a slug, replacement will replace any spaces with "-", remove will remove any of the characters in the array passed in. lower makes sure all characters are lowercase
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+`.()'"\-:@]/g,
          lower: true
        })
        db.collection('Assets')
          .add({
            imageurl: this.imageurl,
            title: this.title,
            description: this.description,
            authors: this.$store.state.username,
            user: this.$store.state.user,
            slug: this.slug,
            type: this.Choice
          })
          .then(() => {
            console.log('This is where we should get routed back to explore')
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    addAuthor() {
      if (this.another) {
        this.authors.push(this.another)
        this.another = ''
      }
    },
    deleteAuthor(auth) {
      this.authors = this.authors.filter(author => {
        return author != auth
      })
    }
  }
}
</script>
