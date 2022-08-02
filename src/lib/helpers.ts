import type { CloudMenuItem } from './types';

export const loadMenu = (): CloudMenuItem[] => {
  const items: CloudMenuItem[] = [];
  // @ts-ignore
  const cloudControlApiConn = loki.model.getConnectionByServiceGroup('urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices');
  // @ts-ignore
  const cloudControlUiConn = loki.model.getConnectionByServiceGroup('urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui');
  let cloudControlHomePage: string;
  if (cloudControlUiConn) {
    cloudControlHomePage = cloudControlUiConn.url;
    const slash = cloudControlHomePage.lastIndexOf('/');
    if (slash > 0) {
      cloudControlHomePage = cloudControlHomePage.substring(0, slash);
    }
  }
  if (cloudControlApiConn && cloudControlUiConn) {
    // @ts-ignore
    loki.data.query({
      queryUrn: 'urn:com:saplingdata:cloudControl:model:queries:myApplications',
      namedParams: [{name: 'name', value: '%'}],
      mapResults: true,
      connection: cloudControlApiConn,
      useCurrentUserAuth: true,
      jsonp: true,
    }).then((data: { results: string | any[]; }) => {
      let app;
      let appPrefix;
      let appHomeUrl;
      let appIconUrl;
      let cloudControlApp = null;
      for (let i = 0; i < data.results.length; i += 1) {
        app = data.results[i];
        // @ts-ignore
        appPrefix = loki.urn.getLastSegment(app.urn);
        appHomeUrl = `${app.url}/${appPrefix}`;
        if (appHomeUrl === cloudControlHomePage) {
          cloudControlApp = app;
          break;
        }
      }

      if (cloudControlApp) {
        // @ts-ignore
        appPrefix = loki.urn.getLastSegment(cloudControlApp.urn);
        appHomeUrl = `${cloudControlApp.url}/${appPrefix}`;
        // @ts-ignore
        appIconUrl = loki.web.resourceUrl(`${cloudControlApp.urn}!small.png`, {connectionUrn: 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'});
        items.push({
          summary: '',
          title: app.name,
          iconUrl: appIconUrl,
          link: appHomeUrl,
          pageUrns: []
        });
      } else if (cloudControlHomePage) {
        // @ts-ignore
        items.push({
          summary: '',
          title: 'Cloud Home',
          // @ts-ignore
          iconUrl: loki.web.resourceUrl('urn:com:saplingdata:appBaseOne:app:resources:public!cloudHome.png'),
          // @ts-ignore
          link: cc_home_page,
          pageUrns: []
        });
      }

      for (let i = 0; i < data.results.length; i += 1) {
        app = data.results[i];
        // @ts-ignore
        appPrefix = loki.urn.getLastSegment(app.urn);
        appHomeUrl = `${app.url}/${appPrefix}`;
        if (appHomeUrl !== cloudControlHomePage) {
          // @ts-ignore
          appIconUrl = loki.web.resourceUrl(`${app.urn}!small.png`, {connectionUrn: 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui'});
          items.push({
            title: app.name,
            summary: app.summary,
            iconUrl: appIconUrl,
            link: appHomeUrl,
            pageUrns: [],
          });
        }
      }
    }, () => {
      if (cloudControlHomePage) {
        items.push({
          title: 'Cloud Home',
          summary: 'Cloud Home',
          // @ts-ignore
          iconUrl: loki.web.resourceUrl('urn:com:saplingdata:appBaseOne:app:resources:public!cloudHome.png'),
          link: cloudControlHomePage,
          pageUrns: [],
        });
      }
    });
  }
  return items;
};
