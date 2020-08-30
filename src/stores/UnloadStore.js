import userStore from "./UserStore";
import dashboardStore from './DashboardStore'
import newsStore from './NewsStore'
import { restartLogin } from './LoginStore'
import { restartOffences } from './OffencesStore'
import { restartRole } from './RoleStore'
import { restartAdmin } from './ParkyAdminStore'
import { restartTickets } from './TicketsStore'
import { restartBollard } from './BollardStore'
import { restartAccount } from './AccountStore'
import cookie from 'react-cookies'

export function unloadStore() {
  cookie.remove('userData');
  userStore.restart();
  dashboardStore.restart();
  newsStore.restart();
  restartAccount()
  restartAdmin()
  restartBollard()
  restartLogin()
  restartOffences()
  restartRole()
  restartTickets()
}