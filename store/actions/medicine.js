import firebase from '../../firebase';
import Medicine from '../../models/Medicine';

export const ADD_MEDICINE = 'ADD_MEDICINE';
export const RETRIEVE_MEDICINE = 'RETRIEVE_MEDICINE';

export const retrieveMedication = () => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref(`/users/${userId}/medicine`)
      .once('value')
      .then(response => {
        const resData = response.toJSON();
        const medication = [];

        for (const key in resData) {
          medication.push(
            new Medicine(
              key,
              resData[key].name,
              resData[key].takeWhenNeeded,
              resData[key].startDate,
              resData[key].endDate,
              null,
              resData[key].usedSum,
              resData[key].quantitySum,
              resData[key].expiry,
              resData[key].dosage,
              resData[key].imageUrl,
              resData[key].iconId,
              resData[key].instructions,
              resData[key].scheduleConfigured,
              resData[key].refillConfigured
            )
          );
        }

        dispatch({ type: RETRIEVE_MEDICINE, medication: medication });
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };
};

export const addMedicine = (
  name,
  expiry,
  dosage,
  imageUrl,
  iconId,
  instructions,
  whenNeeded,
  startDate,
  endDate,
  usedSum,
  quantitySum
) => {
  return async dispatch => {
    //Passing null to update() will remove the data at this location.

    const userId = firebase.auth().currentUser.uid;

    let medicineKey = firebase.database().ref().child(`/users/${userId}/medicine`).push().key;

    const metadata = {
      contentType: 'image/jpeg'
    };

    const imageName = medicineKey + '.jpg';
    const storageRef = firebase.storage().ref().child(`/medicine/${userId}/${imageName}`);

    if (imageUrl) {
      const imageBlob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUrl, true);
        xhr.send(null);
      });

      storageRef.put(imageBlob, metadata).then(() => {
        storageRef
          .getDownloadURL()
          .then(res => {
            const medicineWithImage = {
              id: medicineKey,
              name: name,
              imageUrl: res.toString(),
              iconId: iconId,
              expiry: expiry,
              dosage: dosage,
              instructions: instructions,
              takeWhenNeeded: whenNeeded ? 'yes' : 'no',
              startDate: startDate,
              endDate: endDate,
              usedSum: '0',
              quantitySum: quantitySum,
              scheduleConfigured: false,
              refillConfigured: false
            };
            const updates = {};
            updates[`/users/${userId}/medicine/${medicineKey}`] = medicineWithImage;

            firebase
              .database()
              .ref()
              .update(updates)
              .then(async () => {
                await dispatch({
                  type: ADD_MEDICINE,
                  addMed: medicineWithImage
                });
              })
              .catch(err => {
                throw new Error(err.message);
              });
          })
          .catch(err => {
            throw new Error('Error getting storage reference.', err);
          });
      });

      return;
    }

    const medicine = {
      id: medicineKey,
      name: name,
      imageUrl: 'blank',
      iconId: iconId,
      expiry: expiry,
      dosage: dosage,
      instructions: instructions,
      takeWhenNeeded: whenNeeded ? 'yes' : 'no',
      startDate: startDate,
      endDate: endDate,
      usedSum: '0',
      quantitySum: quantitySum,
      scheduleConfigured: false,
      refillConfigured: false
    };

    const updates = {};
    updates[`/users/${userId}/medicine/${medicineKey}`] = medicine;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(async () => {
        await dispatch({
          type: ADD_MEDICINE,
          addMed: medicine
        });
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };
};
