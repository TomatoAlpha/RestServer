function Adaper (paperData) {
  this.data = paperData;
  this.regex['title'] = '';
  this.regex['questions']['content'] = '';
  this.regex['questions']['content']['text'] = '';
  this.regex['questions']['content']['url'] = '';
  this.regex['questions']['type'] = '';
  this.regex['questions']['checks'] = '';
  this.regex['questions']['groupSwitcher'] = '';
  return this;
}

exports.Adaper = Adaper;

Adaper.prototype.parse = function () {

}
