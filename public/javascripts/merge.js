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
    self.dragged = ko.observable();
    self.isMerge = ko.observable(false);
  
    self.historyClick = (data, event) => {
      let grandParent = event.currentTarget.parentElement.parentElement;
      if (grandParent.classList.contains("multi-node-container")) {
        if (grandParent.classList.contains("expanded")) {
          self.selected(data);
          self.isMerge(false);
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
      }
      container.classList.toggle("expanded");
    }

    self.exitMerge = (data, event) => {
      self.isMerge(false);
    }

    self.allowDrop = (data, ev) => {
      ev.preventDefault();
    }
    
    self.drag = (data, ev) => {
      ev.originalEvent.dataTransfer.setData("text", ev.originalEvent.target.id);
      return true;
    }

    self.drop = (data, ev) => {
      ev.preventDefault();
      self.isMerge(true);
      let dataId = ev.originalEvent.dataTransfer.getData("text");
      let img = document.getElementById(dataId);
      if (!img.classList.toString().includes("merge")) {
        let imgData = ko.dataFor(img);
        self.dragged(imgData);
      } else {
        let target = ev.target;
        if (img.classList.contains("merge-drag-zone2b")) {
          img.classList.remove("orange")
        } else {
          $('#myModal').modal('toggle');
        }
      }
      
      // ev.originalEvent.target.appendChild(document.getElementById(data));
    }

    self.toggleModal = () => {
      $('#myModal').modal('toggle');
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
  
  