function showTribeInfo(data) {
  let name = data.name;
  let summary = data.summary;
  let link = data.link;
  let image = data.image;
  console.log("before tribe SUMMARY info call");
  let params = `name=${name}&summary=${summary}&link=${link}&image=${image}`;
  let url = `/tribe_summary?${params}`;
  window.location.href = url;
}

export { showTribeInfo };
