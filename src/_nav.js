//import store from './stores/UserStore'

export var getnav = (permission) => {
  if (permission.parky)
    return ({
      items: [
        {
          name: 'Tableau de bord',
          url: '/dashboard',
          icon: 'icon-speedometer',

        },
        {
          title: true,
          name: 'Pages',
          wrapper: {            // optional wrapper object
            element: '',        // required valid HTML5 element tag
            attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
          name: 'Tickets',
          url: '/tickets',
          icon: 'icon-envelope'
        },
        {
          name: 'Utilisateurs',
          url: '/users',
          icon: 'icon-people'
        }]
    })
  else
    return (
      {
        items:
          [
            {
              name: 'Tableau de bord',
              url: '/dashboard',
              icon: 'icon-speedometer',

            },
            {
              title: true,
              name: 'Pages',
              wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
              },
              class: ''             // optional class names space delimited list for title item ex: "text-center"
            },
            {
              name: 'Quartiers',
              url: '/quartiers',
              icon: 'icon-map',
              attributes: { disabled: !permission.readBollard },
            },
            {
              name: 'Infractions',
              url: '/infractions',
              icon: 'icon-shield',
              attributes: { disabled: !permission.readOffence },
            },
            {
              attributes: { disabled: !permission.readNews },
              name: 'Actualités',
              url: '/news',
              icon: 'icon-book-open'

            },
            {
              attributes: { disabled: !(permission.readUser || permission.readRole) },
              name: 'Comptes',
              url: '/comptes',
              icon: 'icon-people'

            },
            {
              attributes: { disabled: !permission.readTicket },
              name: 'Tickets',
              url: '/tickets',
              icon: 'icon-envelope'
            },

          ]
      }
    )
}

/*
export var navUser = observer({
  items:
    [
      {
        name: 'Tableau de bord',
        url: '/dashboard',
        icon: 'icon-speedometer',

      },
      {
        title: true,
        name: 'Pages',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Quartiers',
        url: '/quartiers',
        icon: 'icon-map',
        attributes: { disabled: !store.state.permission.readBollard },
      },
      {
        name: 'Infractions',
        url: '/infractions',
        icon: 'icon-shield',
      },
      {
        attributes: { disabled: !store.state.permission.readNews },
        name: 'Actualités',
        url: '/news',
        icon: 'icon-book-open'

      },
      {
        attributes: { disabled: !(store.state.permission.readUser || store.state.permission.readRole) },
        name: 'Comptes',
        url: '/comptes',
        icon: 'icon-people'

      },
      {
        attributes: { disabled: !store.state.permission.readTicket },
        name: 'Tickets',
        url: '/tickets',
        icon: 'icon-envelope'
      },

    ]
});

export const navParky = {
  items: [
    {
      name: 'Tableau de bord',
      url: '/dashboard',
      icon: 'icon-speedometer',

    },
    {
      title: true,
      name: 'Pages',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Tickets',
      url: '/tickets',
      icon: 'icon-envelope'
    },
    {
      name: 'Utilisateurs',
      url: '/users',
      icon: 'icon-people'
    }]
}
*/