const greenApiInstance = {
  _idInstance: "",
  _apiTokenInstance: "",
  setInstance(idInstance, apiTokenInstance) {
    this._idInstance = idInstance
    this._apiTokenInstance = apiTokenInstance
  },
  getInstance() {
    return {
      idInstance: this._idInstance,
      apiTokenInstance: this._apiTokenInstance,
    }
  },
}

export default greenApiInstance
