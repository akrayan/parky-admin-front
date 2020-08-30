import axios from 'axios'
import store from "../stores/NewsStore"
import { defaultHeader, postpicHeader, checkToken, handleError } from "./RequestsTool"

class NewsRequest {

  get() {

    if (checkToken()) {
      store.updateStatus("Loading", null);
      axios.get("http://dev.api.parkyeip.com/admin/news", { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          response.data.data.sort((a, b) => {
            let da = new Date(a.updated_at), db = new Date(b.updated_at);
            return (db.getTime() - da.getTime());
          })
          store.upadteList(response.data.data);
          store.updateStatus("Normal", null);

        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          store.updateStatus("Echec", e[0]);
        });
    }
  }

  onprog = (pe) => {
    console.log("upload");
    console.log(pe);
  }

  postPicture(edit) {
    console.log("try post pic")
    var form = new FormData();
    form.append("file", store.state.currentNews.image, store.state.currentNews.image.name)
    if (checkToken()) {
      store.updateStatus("Loading", null);
      axios.post("http://dev.api.parkyeip.com/admin/pictures", form, { onUploadProgress: this.onprog, headers: postpicHeader })
        .then((response) => {
          console.log(response.data.data);
          store.upadtePicUrl(response.data.url);
          edit ? this.put() : this.post();
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          store.updateStatus("Echec", e[0], 0);
        });
    }
  }

  post() {
    console.log("try post")

    if (checkToken()) {
      store.updateStatus("Loading", null);
      console.log(store.state.currentNews.event)
      //store.prepareEvents()
      axios.post("http://dev.api.parkyeip.com/admin/news", {
        title: store.state.currentNews.title,
        description: store.state.currentNews.description,
        url: store.state.currentNews.url,
        event: {
          hour_start: store.state.currentNews.event.hour_start,
          hour_end: store.state.currentNews.event.hour_end,
          date_start: store.state.currentNews.event.date_start,
          date_end: store.state.currentNews.event.date_end,
        }
        //city: userStore.state.user.city
      },
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          this.get();
          //refreshList();
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          store.updateStatus("Echec", e[0], 0);
        });
    }
  }

  put() {
    if (checkToken()) {
      store.updateStatus("Loading", null);
      //store.prepareEvents()
      let d = {
        title: store.state.currentNews.title,
        description: store.state.currentNews.description,
        url: store.state.currentNews.url,
        event: {
          hour_start: store.state.currentNews.event.hour_start ? store.state.currentNews.event.hour_start : null,
          hour_end: store.state.currentNews.event.hour_end ? store.state.currentNews.event.hour_end : null,
          date_start: store.state.currentNews.event.date_start ? store.state.currentNews.event.date_start : null,
          date_end: store.state.currentNews.event.date_end ? store.state.currentNews.event.date_end : null,
        }
        //city: userStore.state.user.city
      }
      console.log(d);
      axios.put("http://dev.api.parkyeip.com/admin/news/" + store.state.currentNews.id, d,
        { headers: defaultHeader })
        .then((response) => {
          console.log(response.data);
          this.get();

          //refreshList
        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          store.updateStatus("Echec", e[0], 1);
        });
    }
  }

  delet() {
    if (checkToken()) {
      store.updateStatus("Loading", null);
      axios.delete("http://dev.api.parkyeip.com/admin/news/" + store.state.currentNews.id, { headers: defaultHeader })
        .then((response) => {
          console.log(response.data.data);
          this.get();

        })
        .catch((error) => {
          let e = [""];
          handleError(error, e)
          store.updateStatus("Echec", e[0], 2);
        });
    }
  }
}

export default new NewsRequest();
