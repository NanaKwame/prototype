let data = [
  {id: 0, image: 'cut0.png', children: null},
  [
    {id: 1110, image: 'cut1110.png', children: null},
    {id: 1, image: 'cut1.png', children: null},
    {id: 111, image: 'cut111.png', children: null}
  ],
  {id: 11, image: 'cut11.png', children: null},
  {id: 22, image: 'cut22.png', children: null},
  [
    {id: 4, image: 'cut4.png', children: null},
    {id: 33, image: 'cut33.png', children: null}
  ],
  {id: 5, image: 'cut5.png', children: null}
];

let data2 = [
  {id: 0, image: 'cut0.png', children: [

    {id: 1, image: 'cut1.png', children: [
      {id: 2, image: 'cut2.png', children: [
        {id: 3, image: 'cut3.png', children: null}
      ]}
    ]},

    {id: 111, image: 'cut111.png', children: null},

    {id: 1110, image: 'cut1110.png', children: [
      {id: 11, image: 'cut11.png', children: [
        {id: 22, image: 'cut22.png', children: [
          {id: 33, image: 'cut33.png', children: null},
          {id: 4, image: 'cut4.png', children: [
            {id: 5, image: 'cut5.png', children: null}
          ]}
        ]}
      ]}
    ]}
  ]}
];

/**
 * @typedef History
 * @prop {string} id - some string, valid in a URL path
 * @prop {string} image - link to an external source
 * @prop {string} children - username
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
   * @param {string} image - History image
   * @param {string} children - History children
   * @return {History} - created history
   */
  static addOne(id, image, children = null) {
    const history = { id, image, children };
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
   * @param {string} image - new URL
   * @return {History | undefined} - updated History
   */
  static updateOne(id, image) {
    const history = Histories.findOne(id);
    history.image = image;
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
