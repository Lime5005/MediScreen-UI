import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrash, faPlus, faExternalLinkAlt, faIdCardAlt, faLaptopMedical, faHeartbeat, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrash, faPlus, faExternalLinkAlt, faIdCardAlt, faLaptopMedical, faHeartbeat, faCircleNotch)

Vue.component('fa-icon', FontAwesomeIcon)