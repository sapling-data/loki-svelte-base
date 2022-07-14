<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Transition,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Cloud, Cube } from '@steeze-ui/heroicons';

  const menuItems = [];
  const getMenuItems = async () => {
    const connection = await loki.model.getConnectionByServiceGroup('urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices');
    const data = await loki.data.query({
      queryUrn: ':model:queries:myApplications',
      namedParams: [{ name: 'name', value: '%' }],
      mapResults: true,
      connection,
    });
    return data.results.map((result) => {
      const menuItem = {
        ...result,
      };
      menuItem.iconUrl = loki.web.resourceUrl(`${menuItem.urn}!small.png`);
      return menuItem;
    });
  };

  const loadMenu = () => {
    const cloudControlApiConn = loki.model.getConnectionByServiceGroup('urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices');
    const cloudControlUiConn = loki.model.getConnectionByServiceGroup('urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui');
    let cloudControlHomePage;
    if (cloudControlUiConn) {
      cloudControlHomePage = cloudControlUiConn.url;
      const slash = cloudControlHomePage.lastIndexOf('/');
      if (slash > 0) {
        cloudControlHomePage = cloudControlHomePage.substring(0, slash);
      }
    }
    if (cloudControlApiConn && cloudControlUiConn) {
      loki.data.query({
        queryUrn: 'urn:com:saplingdata:cloudControl:model:queries:myApplications',
        namedParams: [{ name: 'name', value: '%' }],
        mapResults: true,
        connection: cloudControlApiConn,
        useCurrentUserAuth: true,
        jsonp: true,
      }).then((data) => {
        let app;
        let appPrefix;
        let appHomeUrl;
        let appIconUrl;
        let cloudControlApp = null;
        for (let i = 0; i < data.results.length; i += 1) {
          app = data.results[i];
          appPrefix = loki.urn.getLastSegment(app.urn);
          appHomeUrl = `${app.url}/${appPrefix}`;
          if (appHomeUrl === cloudControlHomePage) {
            cloudControlApp = app;
            break;
          }
        }

        if (cloudControlApp) {
          appPrefix = loki.urn.getLastSegment(cloudControlApp.urn);
          appHomeUrl = `${cloudControlApp.url}/${appPrefix}`;
          appIconUrl = loki.web.resourceUrl(`${cloudControlApp.urn}!small.png`, { connectionUrn: 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui' });
          menuItems.push({
            title: app.name,
            iconUrl: appIconUrl,
            link: appHomeUrl,
            pageUrns: [],
          });
        } else if (cloudControlHomePage) {
          menuItems.push({
            title: 'Cloud Home',
            iconUrl: loki.web.resourceUrl('urn:com:saplingdata:appBaseOne:app:resources:public!cloudHome.png'),
            link: cc_home_page,
            pageUrns: [],
          });
        }

        for (let i = 0; i < data.results.length; i += 1) {
          app = data.results[i];
          appPrefix = loki.urn.getLastSegment(app.urn);
          appHomeUrl = `${app.url}/${appPrefix}`;
          if (appHomeUrl !== cloudControlHomePage) {
            appIconUrl = loki.web.resourceUrl(`${app.urn}!small.png`, { connectionUrn: 'urn:com:saplingdata:cloudControl:model:serviceGroups:cloudServices-ui' });
            menuItems.push({
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
          menuItems.push({
            title: 'Cloud Home',
            summary: 'Cloud Home',
            iconUrl: loki.web.resourceUrl('urn:com:saplingdata:appBaseOne:app:resources:public!cloudHome.png'),
            link: cloudControlHomePage,
            pageUrns: [],
          });
        }
      });
    }
  };

  onMount(() => loadMenu());
</script>

<Menu as="div" class="mr-2 my-auto relative z-50">
  <div>
    <MenuButton
            class="bg-gray-800 flex text-sm rounded-md text-gray-400 hover:text-white"
    >
        <span class="sr-only">Open cloud menu</span>
        <Icon src={Cloud} theme="solid" class="h-5 w-5" aria-hidden="true" />
    </MenuButton>
  </div>
  <Transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
    <MenuItems
            class="origin-top-left absolute left-0 p-1.5 w-auto inline-block
      rounded-md shadow-lg bg-white ring-1 ring-black
      ring-opacity-5 focus:outline-none max-h-72 overflow-y-auto">
      {#each menuItems as item }
        <MenuItem slot="active" class="flex flex-row">
          <a
                  href={item.link}
                  class="text-white flex w-full items-center px-2 py-1.5
                  text-xxs hover:bg-gray-200 rounded-md
                  text-gray-700 whitespace-nowrap">
            <Icon src={Cube} theme="solid" class="block h-4 w-4 mr-2" />
            <span class="my-auto text-xxs">{ item.title }</span>
          </a>
        </MenuItem>
      {/each}
    </MenuItems>
  </Transition>
</Menu>
