// TS에게 JS파일을 확인하라고 알리는 것 @ts-check
// (방대한 양의 JS코드를 TS의 보호를 받게 하고 싶은 경우)

// @ts-check

// JS에서 타입을 사용하기 위해 JSDoc를 사용한다
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns {boolean}
 */
export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}

init({ debug: true, url: 'https://velog.io/@jan' });
exit(1);
