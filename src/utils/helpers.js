import store from '@/infrastructure/store';
import { padEnd, truncate, sum, map, join, split } from 'lodash';

export const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  const notification = {
    type: '',
    text: ''
  }

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Fallback: Copying cert command was ' + msg)
    notification.type = 'success'
    notification.text = 'Fallback: Copying cert command was ' + msg
    store.dispatch('notification/add', notification)
  } catch (err) {
    notification.type = 'error'
    notification.text = 'Fallback: Oops, unable to copy: ' + err
    store.dispatch('notification/add', notification)
  }

  document.body.removeChild(textArea);
}

export const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }

  const notification = {
    type: '',
    text: ''
  }
  navigator.clipboard.writeText(text).then(
    function () {
      notification.type = 'success'
      notification.text = 'Copy to clipboard successful'
      store.dispatch('notification/add', notification)
    },
    function (error) {
      notification.type = 'error'
      notification.text = ' The text could not be copied: ' + error
      store.dispatch('notification/add', notification)
    }
  )
}

export const pad = (string) => {
  return padEnd(truncate(string, { length: 30, omission: '' }), 30, '<');
};

export const calculate = (string) => {
  const dict = {
    '<': 0,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 18,
    J: 19,
    K: 20,
    L: 21,
    M: 22,
    N: 23,
    O: 24,
    P: 25,
    Q: 26,
    R: 27,
    S: 28,
    T: 29,
    U: 30,
    V: 31,
    W: 32,
    X: 33,
    Y: 34,
    Z: 35,
  };
  return (
    sum(
      map(
        map(string, (letter) => {
          return dict[letter.toUpperCase()];
        }),
        (val, index) => {
          let weighted = val;
          switch (index % 3) {
            case 0:
              weighted = val * 7;
              break;
            case 1:
              weighted = val * 3;
              break;
            case 2:
              break;
          }
          return weighted;
        },
      ),
    ) % 10
  );
};

export const constructMachineReadableStrings = (rnData) => {
  const mrs = [];

  if (
    rnData.cardNumber &&
    rnData.sex &&
    rnData.nationality &&
    rnData.cardValidityDateEnd &&
    rnData.cardValidityDateBegin &&
    rnData.nationalNumber
  ) {
    // First line
    const prefix = 'ID';
    let first = 'BEL' + rnData.cardNumber.substr(0, 9) + '<' + rnData.cardNumber.substr(9);
    first += calculate(first);
    first = pad(prefix + first);
    mrs.push(first.toUpperCase());

    // Second line
    let second = rnData.nationalNumber.substr(0, 6);
    second += calculate(second);
    second += rnData.sex;
    const validity =
      rnData.cardValidityDateEnd.substr(8, 2) +
      rnData.cardValidityDateEnd.substr(3, 2) +
      rnData.cardValidityDateEnd.substr(0, 2);
    second += validity + calculate(validity);
    second += rnData.nationality.substr(0, 3);
    second += rnData.nationalNumber;
    const finalCheck =
      rnData.cardNumber.substr(0, 10) + rnData.nationalNumber.substr(0, 6) + validity + rnData.nationalNumber;
    second += calculate(finalCheck);
    second = pad(second);
    mrs.push(second.toUpperCase());

    // Third line
    let third =
      join(split(rnData.name, ' '), '<') +
      '<<' +
      join(split(rnData.firstNames, ' '), '<') +
      '<' +
      join(split(rnData.thirdName, ' '), '<');
    third = pad(third);
    mrs.push(third.toUpperCase());
  }

  return mrs;
};

