const path	= require( 'path' );
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

function resolve ( dir )
{
	return path.join( __dirname, dir );
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': resolve( 'src' ),
		}
	}
})
