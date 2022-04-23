import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { worker } from './api/server'
import { fetchUsers } from './features/user/usersSlice';

const App = lazy(() => import('./App'));
const Form = lazy(() => import('./features/main-concepts/Form'));
const NumberList = lazy(() => import('./features/main-concepts/ListingRenderingOne'));
const ConditionalRenderingOne = lazy(() => import('./features/main-concepts/ConditionalRenderingOne'));
const HandlingEventOne = lazy(() => import('./features/main-concepts/HandlingEventOne'));
const Calculator = lazy(() => import('./features/lifting-state-up/Calculator'));
const ContainmentEx2 = lazy(() => import('./features/composition-inheritance/ContainmentEx2'));
const WelcomeDialog = lazy(() => import('./features/composition-inheritance/ContainmentEx1'));
const ContextEx1 = lazy(() => import('./features/advanced-topics/ContextEx1'));
const ForwardingRef = lazy(() => import('./features/advanced-topics/ForwardingRef'));
const DisplayCounters = lazy(() => import('./features/advanced-topics/hoc/DisplayCounters'));
const Portals = lazy(() => import('./features/advanced-topics/Portal'));
const Refs = lazy(() => import('./features/advanced-topics/Refs'));
const RenderingProps = lazy(() => import('./features/advanced-topics/RenderingProps'));
const UseEffectEx1 = lazy(() => import('./features/hooks/use-effect-examples/ex1'));
const MuiTable = lazy(() => import('./features/hooks/use-effect-examples/rtable'));
const PostsList = lazy(() => import('./features/posts/PostsList'));
const numbers = [1, 2, 3, 4, 5];
const SinglePostPage = lazy( () => import('./features/posts/SinglePostPage'));
const EditPostForm = lazy( () => import('./features/posts/EditPostForm'));
const UsersList = lazy( () => import('./features/user/UsersList'));
const UserPage = lazy( () => import('./features/user/UserPage'));
const NotificationList = lazy( () => import('./features/notifications/NotificationsList'));

async function start() {
  await worker.start({ onUnhandledRequest: 'bypass' });
  store.dispatch(fetchUsers());
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="form" element={<Form />} />
            <Route path="numbers" element={<NumberList numbers={numbers} />} />
            <Route path="conditional-rendering" element={<ConditionalRenderingOne isLoggedIn={false}/>} />
            <Route path="handling-events" element={<HandlingEventOne/>} />
            <Route path="lifting-state-up" element={<Calculator/>} />
            <Route path="containment-ex-1" element={<WelcomeDialog/>} />
            <Route path="containment-ex-2" element={<ContainmentEx2/>} />
            <Route path="context-ex-1" element={<ContextEx1/>} />
            <Route path="forwarding-ref" element={<ForwardingRef/>} />
            <Route path="hoc-components" element={<DisplayCounters/>} />
            <Route path="portals" element={<Portals/>} />
            <Route path="refs" element={<Refs/>} />
            <Route path="rendering-props" element={<RenderingProps/>} />
            <Route path="use-effect-ex1" element={<UseEffectEx1/>} />
            <Route path="rtable" element={<MuiTable/>} />
            <Route path="posts" element={<PostsList/>} />
            <Route path="posts/:postId" element={<SinglePostPage />} />
            <Route path="/editPost/:postId" element={<EditPostForm />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:userId" element={<UserPage></UserPage>} />
            <Route path="/notifications" element={<NotificationList></NotificationList>} />
          </Routes>
          </Suspense>
        </BrowserRouter>,
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
start()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
