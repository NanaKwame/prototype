// Axios responses have a lot of data. This shows only the most relevant data.
function showResponse(axiosResponse) {
    const fullResponse = axiosResponse.response === undefined
      ? axiosResponse
      : axiosResponse.response;
    const abridgedResponse = {
      data: fullResponse.data,
      status: fullResponse.status,
      statusText: fullResponse.statusText,
    };
    showObject(abridgedResponse);
  }
  
  function addOne(fields) {
    axios.post('/api/shorts', fields)
      .then(showResponse)
      .catch(showResponse);
  }
  
  function getAll() {
    return axios.get('/api/histories');
  }
  
  function AppViewModel() {
    let self = this;
    self.images = ko.observableArray([]);
    self.selected = ko.observable();
  
    self.historyClick = (data, event) => {
      self.selected(data);
    }
    getAll().then( (res) => {
      self.images(res.data);
      self.selected(res.data[0]);
    })
  }
  
  // Activates knockout.js
  $(function() {
    ko.applyBindings(new AppViewModel());
  });
  
  