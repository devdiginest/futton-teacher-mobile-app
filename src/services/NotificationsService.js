import axios        from 'axios';
import { API_URL }  from '../config/Constants';

function getNotificationsData() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/mobile/notifications`)
      .then(async (response) => {
        // console.log('[XXX] Response: ');
        // console.log(response);

        try {
          // DO WHATEVER IS REQUIRED
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        // console.log('[XXX] Then-Catch: ');
        // console.log(err);

        reject(err);
      });
  });
}

export const notificationsService = { getNotificationsData };
