function (doc, req) {
  var reqDate = new Date(req.query.date);
  return ((doc.doc_type && doc.doc_type === 'deliveryRound' )
  && ((new Date(doc.startDate) <= reqDate) && (reqDate <= new Date(doc.endDate))));
}

