var list = [
    {
      id: 0,
      title: "title 1",
      date: "24/08/2018",
      hour: "12:05",
      image: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer orci nulla, interdum sit amet lorem id, eleifend finibus neque. Nulla ac justo vitae ex sollicitudin dapibus. Aliquam et dolor eu libero congue cursus vestibulum sed turpis. Vestibulum blandit, nisl sit amet ornare aliquet, enim augue varius erat, non eleifend leo metus eget justo. Sed at dui et libero mollis hendrerit eu id justo. Mauris tincidunt felis malesuada, suscipit risus ac, interdum sapien. Sed sit amet lectus massa nunc."
    },
    {
      id: 1,
      title: "title 1",
      date: "24/08/2008",
      hour: "12:45",
      image: "",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer orci nulla, interdum sit amet lorem id, eleifend finibus neque. Nulla acauris tincidunt felis malesuada, suscipit risus ac, interdum sapien. Sed sit amet lectus massa nunc."
    },
    {
      id: 2,
      title: "title 2",
      date: "24/11/2018",
      hour: "19:05",
      image: "",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer orcnc."
    },
  ]

/*
*
  //       OLD FEATURE
 
function NewsList(props) {
    const numbers = props.list;
    const listItems = numbers.map((news) =>
      <ListGroupItem key={news.id.toString()} onClick={() => editNews(news)} action>
        <Row className="align-items-center">
          <div className="imageCol">
            {
              news.image !== "" ?
                <img className="image" alt={"img " + news.id} src={news.image} onClick={() => console.log("zooooooob      " + news.id)} />
                :
                <img className="icon" alt={"img " + news.id} src={addIcon} onClick={() => onClickAddImage(news)} />
            }
          </div>
          <Col>
            <ListGroupItemHeading>{news.title}</ListGroupItemHeading>
            <ListGroupItemText>
              {news.description}
            </ListGroupItemText>
          </Col>{
            /*
            <i color="danger" className="icon-close icons font-2xl d-block mt-4" onClick={() => console.log("zaaaaaaaab      " + news.id)} />
          */
  /* }
  </Row>
  </ListGroupItem>
  );
  return (
  listItems
  );
  }*/
  