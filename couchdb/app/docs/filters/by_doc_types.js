function(doc, req) {
  var docTypes = JSON.parse(req.query.docTypes);
  return (doc.doc_type && (docTypes.indexOf(doc.doc_type) !== -1));
}

