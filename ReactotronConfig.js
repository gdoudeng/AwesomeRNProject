import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

export default Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: "React Native App" }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) //  <- here i am!
  .connect(); // let's connect!
