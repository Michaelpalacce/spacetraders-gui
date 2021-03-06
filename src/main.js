import { createApp }	from 'vue'
import App				from './App.vue'
import mitt				from 'mitt';
import router			from './router/index'
import './assets/index.css';

const emitter						= mitt();
const app							= createApp( App );

app.config.globalProperties.emitter	= emitter;
app.use( router ).mount( '#app' );
