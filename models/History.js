let data = [];

/**
 * @typedef History
 * @prop {string} id - some string, valid in a URL path
 * @prop {string} url - link to an external source
 * @prop {string} creator - username
 */

/**
 * @class Histories
 * Stores all Histories.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Histories {
  /**
   * Add a History.
   * @param {string} id - History id
   * @param {string} url - History url
   * @param {string} creator - History creator
   * @return {History} - created history
   */
  static addOne(id, url, creator = null) {
    const history = { id, url, creator };
    data.push(history);
    return history;
  }

  /**
   * Find a History by Name.
   * @param {string} id - id of History to find
   * @return {History | undefined} - found History
   */
  static findOne(id) {
    return data.filter(history => history.id === id)[0];
  }

  /**
   * Return an array of all of the Histories.
   * @return {History[]}
   */
  static findAll() {
    return data;
  }

  /**
   * Update a History.
   * @param {string} id - id of History to update
   * @param {string} url - new URL
   * @return {History | undefined} - updated History
   */
  static updateOne(id, url) {
    const history = Histories.findOne(id);
    history.url = url;
    return history;
  }

  /**
   * Delete a History
   * @param {string} id - id of History to delete
   * @return {History | undefined} - deleted History
   */
  static deleteOne(id) {
    const history = Histories.findOne(id);
    data = data.filter(s => s.id !== id);
    return history;
  }
}

module.exports = Histories;
