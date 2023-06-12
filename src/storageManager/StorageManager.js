import Globals from '../constant/Globals';
import {AppStorage} from './AppStorage';

export default class StorageManager {
  /**
        *
        Purpose:clear data from Async storage
       * Created/Modified By: Jenson
       * Created/Modified Date: 27 Dec 2021
       * Steps:
           1.Clear the data in the Async storage
        */
  static clearAllData = async () => {
    try {
      let res = await AppStorage.clearAll();
      return res;
    } catch (e) {
      //consol.log(e)
    }
  };

  /**
        *
        Purpose:clear data from Async storage
       * Created/Modified By: Jenson
       * Created/Modified Date: 27 Dec 2021
       * Steps:
           1.Clear the data in the Async storage
        */
  static clearUserRelatedData = async () => {
    try {
      let keys = [
        Globals.STORAGE_KEYS.USER_DETAILS,
        Globals.STORAGE_KEYS.IS_AUTH,
      ];

      //Clearing from globals

      Globals.USER_DETAILS = {};
      Globals.IS_AUTHORIZED = false;

      //Clearing from db
      let res = await AppStorage.clearItems(keys);
      return res;
    } catch (e) {
      console.log('ClearUserRelatedData: ', e);
    }
  };

  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 27 Dec 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getIsAuthorized = async () => {
    try {
      let res = await AppStorage.getItem(Globals.STORAGE_KEYS.IS_AUTH);
      return res;
    } catch (e) {}
  };

  /**
    * Purpose:Save the value in to result in Async storage
    * Created/Modified By: Jenson John
    * Created/Modified Date:  31 Dec 2021
    * Steps:
        1.Create the value true
        2.Store the value into result
    */

  static saveUserDetails = async info => {
    try {
      await AppStorage.setItem(Globals.STORAGE_KEYS.USER_DETAILS, info);
      await AppStorage.setItem(Globals.STORAGE_KEYS.IS_AUTH, 'true');
    } catch (e) {}
  };

  /**
       *
       Purpose:Get the value
      * Created/Modified By: Jenson John
      * Created/Modified Date: 31 Dec 2021
      * Steps:
          1.Get the value from Async storage
          2.return the value
       */
  static getUserDetails = async () => {
    try {
      let res = await AppStorage.getItem(Globals.STORAGE_KEYS.USER_DETAILS);
      return res;
    } catch (e) {}
  };

  static setStoreData = async data => {
    try {
      await AppStorage.setItem(Globals.STORAGE_KEYS.STORE_DETAILS, data);
    } catch (e) {}
  };
  static getStoreData = async () => {
      try {
        let res = await AppStorage.getItem(Globals.STORAGE_KEYS.STORE_DETAILS);
        return res;
      } catch (e) {}
  };
}
