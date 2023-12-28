import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/front/home",
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import("@/views/User"),
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import("@/views/Person"),
      },
      {
        path: 'meals',
        name: 'Meals',
        component: () => import("@/views/Meals.vue"),
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import("@/views/Comment.vue"),
      },
      {
        path: 'jubao',
        name: 'Jubao',
        component: () => import("@/views/jubao"),
      },
      {
        path: 'littleWorldManager',
        name: 'LittleWorldManager',
        component: () => import("@/views/LittleWorldManager.vue"),
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import("@/views/notice"),
      },
    ]
  },
  {
    path: "/front",
    name: "Front",
    component: () => import("@/layout/Front"),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import("@/views/front/Home"),
      },
      {
        path: 'littleWorld',
        name: 'LittleWorld',
        component: () => import("@/views/front/LittleWorld.vue"),
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import("@/views/front/Detail"),
      },
      {
        path: 'person',
        name: 'FrontPerson',
        component: () => import("@/views/Person"),
      },
      {
        path: 'longComment',
        name: 'LongComment',
        component: () => import("@/views/front/LongComment"),
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import("@/views/front/Search"),
      },
      {
        path: 'collect',
        name: 'Collect',
        component: () => import("@/views/front/Collect"),
      },
      {
        path: 'subscribePerson',
        name: 'SubscribePerson',
        component: () => import("@/views/front/SubscribePerson.vue"),
      },
      {
        path: 'longCommentTable',
        name: 'LongCommentTable',
        component: () => import("@/views/front/LongCommentTable"),
      },
      {
        path: 'collectedMeal',
        name: 'CollectedMeal',
        component: () => import("@/views/front/CollectedMeal.vue"),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("@/views/Register")
  },
  {
    path: '/pass',
    name: 'Pass',
    component: () => import("@/views/FindPassword.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(to.path)
//   if (!to.path.includes('front') && !(to.path === '/login') && !(to.path === '/register')) {
//     let user = sessionStorage.getItem("user")
//     if (!user) {
//       router.replace("/login")
//     } else {
//       next()
//     }
//   }
// })

export default router
