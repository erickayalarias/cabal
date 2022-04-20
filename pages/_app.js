import '../styles/globals.css'
import "regenerator-runtime/runtime"
ThirdwebWeb3Provider
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Provider } from "react-redux";
import { store, wrapper } from '../redux/store';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

function MyApp({ Component, pageProps }) {
  const supportedChainsIds = [1]
  const connectors = {
    injected:{}
  }
  return (
    <ThirdwebProvider
      supportedChainsIds={supportedChainsIds}
      connectors={connectors}
    >
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
    </ThirdwebProvider>
  
  )
}

export default MyApp
