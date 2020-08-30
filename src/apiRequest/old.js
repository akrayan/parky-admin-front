function refreshList() {
    var userData = cookie.load('userData');
  
    if (userData === undefined) {
      history.push('/login')
      //alert("votre session a expire")
  
    }
    else {
      axios.get("http://dev.api.parkyeip.com/admin/news", {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + userData
        }
      })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.data);
          console.log(response.data.data[0]);
  
          appState.list = response.data.data;
        })
        .catch((e) => {
          console.log(e.response);
          history.push('/login')
          alert("votre session a expire")
        })
    }
  }
  
  function putNews(userData) {
    axios.put("http://dev.api.parkyeip.com/admin/news/" + appState.currentNews.id, {
      title: appState.currentNews.title,
      description: appState.currentNews.description,
      url: appState.currentNews.url,
    },
      {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + userData
        }
      })
      .then((response) => {
        console.log(response.data)
        refreshList();
      })
      .catch((e) => {
        console.log(e.response)
        history.push('/login')
        alert("votre session a expire")
      });
  }
  
  const confirmEdit = () => {
    var i = 0;
    var userData = cookie.load('userData');
    if (userData === undefined) {
      history.push('/login')
      //alert("votre session a expire")
  
    }
    appState.emptyText = appState.currentNews.description === "";
    appState.emptyTitle = appState.currentNews.title === "";
    //appState.emptyCity = appState.currentNews.city_name === "";
    if (!appState.emptyText && !appState.emptyTitle)//&& !appState.emptyCity)
    {
      while (i < appState.list.length && appState.list[i].id !== appState.currentNews.id)
        i++;
      if (i < appState.list.length) {
        appState.list[i].url = appState.currentNews.url;
        appState.list[i].title = appState.currentNews.title;
        appState.list[i].description = appState.currentNews.description;
        appState.editModal = false;
  
        if (appState.oldurl != appState.currentNews.url) {
          var form = new FormData();
          form.append("file", appState.currentNews.image, appState.currentNews.image.name)
          axios.post("http://dev.api.parkyeip.com/admin/pictures", form,
            {
              headers: {
                "Content-type": "multipart/form-data",
                'Authorization': 'Bearer ' + userData
              }
            })
            .then((response) => {
              console.log(response.data)
              appState.currentNews.url = response.data.url
              //refreshList();
              putNews(userData);
            })
            .catch((e) => {
              console.log(e.response)
              history.push('/login')
              alert("votre session a expire")
            });
        }
        else
          putNews(userData);
      }
    }
  }
  
  
  const deleteNews = () => {
    var i = 0;
    var userData = cookie.load('userData');
    if (userData === undefined) {
      history.push('/login')
      //alert("votre session a expire")
  
    }
    while (i < appState.list.length && appState.list[i].id !== appState.currentNews.id)
      i++;
    if (i < appState.list.length) {
      console.log(i)
      console.log(appState.list[i])
      appState.list.splice(i, 1)
      //console.log(list[i])
      appState.editModal = false;
  
      axios.delete("http://dev.api.parkyeip.com/admin/news/" + appState.currentNews.id, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          'Authorization': 'Bearer ' + userData
        }
      })
        .then((response) => {
          console.log(response.data);
          //console.log(response.data[0]);
  
          //appState.list = response.data;
        })
        .catch((e) => {
          console.log(e.response);
          history.push('/login')
          alert("votre session a expire")
        })
    }
  
    postNews(userData) {
      axios.post("http://dev.api.parkyeip.com/admin/news", {
        title: appState.currentNews.title,
        description: appState.currentNews.description,
        url: appState.currentNews.url,
        events: [],
      },
        {
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + userData
          }
        })
        .then((response) => {
          console.log(response.data)
          refreshList();
        })
        .catch((e) => {
          console.log(e.response)
          history.push('/login')
          alert("votre session a expire")
        });
    }
  
    addNews() {
      var userData = cookie.load('userData');
      if (userData === undefined) {
        history.push('/login')
        //alert("votre session a expire")
  
      }
      appState.emptyText = appState.currentNews.description === "";
      appState.emptyTitle = appState.currentNews.title === "";
      //appState.emptyCity = appState.currentNews.city_name === "";
      if (!appState.emptyText && !appState.emptyTitle)//&& !appState.emptyCity)
      {
        list.push(appState.currentNews);
        appState.modal = !appState.modal;
        if (appState.currentNews.url != "") {
          var form = new FormData();
          form.append("file", appState.currentNews.image, appState.currentNews.image.name)
          axios.post("http://dev.api.parkyeip.com/admin/pictures", form,
            {
              headers: {
                "Content-type": "multipart/form-data",
                'Authorization': 'Bearer ' + userData
              }
            })
            .then((response) => {
              console.log(response.data)
              appState.currentNews.url = response.data.url
              //refreshList();
              this.postNews(userData);
            })
            .catch((e) => {
              console.log(e.response)
              history.push('/login')
              alert("votre session a expire")
            });
        }
        else
          this.postNews(userData);
      }
    }
  