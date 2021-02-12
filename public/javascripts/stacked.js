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
  self.popUpData = ko.observableArray([]);

  self.historyClick = (data, event) => {
    let grandParent = event.currentTarget.parentElement.parentElement;
    if (grandParent.classList.contains("multi-node-container")) {
      if (grandParent.classList.contains("expanded")) {
        self.selected(data);
      }

    } else {
      self.selected(data);
    }    
  }
  self.nodeClick = (data, event) => {
    let container = event.currentTarget;
    if (!container.classList.contains("expanded")) {
      event.preventDefault();
      event.stopPropagation();
      self.popUpData(data);
    }
    container.classList.toggle("expanded");
  }

  getAll().then( (res) => {
    self.images(res.data);
    self.selected(res.data[0]);
    $('[data-toggle="popover"]').popover({
      html: true,
      content: function() {
        return $('#popover_content_wrapper').html();
      },
      delay : {
        show: 200
      }
    });
  })

}

// Activates knockout.js
$(function() {
  ko.applyBindings(new AppViewModel());
});

