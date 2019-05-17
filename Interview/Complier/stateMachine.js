var data = function (c) {
  if (c == "&") {
    return characterReferenceInData;
  }
  if (c == "<") {
    return tagOpen;
  } else if (c == "\0") {
    error();
    emitToken(c);
    return data;
  } else if (c == EOF) {
    emitToken(EOF);
    return data;
  } else {
    emitToken(c);
    return data;
  }
};
var tagOpenState = function tagOpenState(c) {
  if (c == "/") {
    return endTagOpenState;
  }
  if (c.match(/[A-Z]/)) {
    token = new StartTagToken();
    token.name = c.toLowerCase();
    return tagNameState;
  }
  if (c.match(/[a-z]/)) {
    token = new StartTagToken();
    token.name = c;
    return tagNameState;
  }
  if (c == "?") {
    return bogusCommentState;
  } else {
    error();
    return dataState;
  }
};
//……