import { pageTitle } from 'ember-page-title';
import {
  HdsAlert,
  HdsAppFrame,
  HdsAppHeader,
  HdsAppSideNav,
  HdsAppSideNavList,
  HdsBadge,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsButton,
  HdsPageHeader,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import { prototypeScenarios } from 'ember-hds-prototype/data/prototype-scenarios';

<template>
  {{pageTitle "HDS prototype starter"}}

  <HdsAppFrame as |Frame|>
    <Frame.Header>
      <HdsAppHeader>
        <:logo>
          <a class="prototype-brand" href="/">HDS prototype</a>
        </:logo>
        <:globalActions>
          <span class="prototype-header-context">Replace with project context</span>
        </:globalActions>
      </HdsAppHeader>
    </Frame.Header>

    <Frame.Sidebar>
      <HdsAppSideNav @isCollapsible={{true}}>
        <HdsAppSideNavList aria-label="Prototype navigation" as |Nav|>
          <Nav.Title>Prototype</Nav.Title>
          <Nav.Link
            @icon="dashboard"
            @text="Overview"
            @href="/"
            @isActive={{true}}
          />
          <Nav.Link @icon="settings" @text="Settings" @href="#settings" />
        </HdsAppSideNavList>
      </HdsAppSideNav>
    </Frame.Sidebar>

    <Frame.Main>
      <main class="prototype-main" id="hds-main">
        <HdsPageHeader as |PH|>
          <PH.Title>Prototype starter</PH.Title>
          <PH.Breadcrumb>
            <HdsBreadcrumb>
              <HdsBreadcrumbItem @text="Prototypes" @icon="folder" />
              <HdsBreadcrumbItem @text="Starter" />
            </HdsBreadcrumb>
          </PH.Breadcrumb>
          <PH.IconTile @icon="dashboard" />
          <PH.Badges>
            <HdsBadge @text="HDS ready" @color="success" />
          </PH.Badges>
          <PH.Description>
            Build product-specific flows with real Helios components, semantic
            tokens, and typed fixture data.
          </PH.Description>
          <PH.Actions>
            <HdsButton
              @text="HDS documentation"
              @icon="external-link"
              @iconPosition="trailing"
              @color="secondary"
              @href="https://helios.hashicorp.design/components"
            />
          </PH.Actions>
        </HdsPageHeader>

        <HdsAlert @type="inline" @color="highlight" as |A|>
          <A.Title>Start with behavior, then compose with HDS</A.Title>
          <A.Description>
            Put reusable scenarios in
            <code class="prototype-code">app/data</code>
            and keep custom CSS limited to layout and product-specific patterns.
          </A.Description>
        </HdsAlert>

        <section class="prototype-section" aria-labelledby="scenario-heading">
          <h2 class="prototype-section-heading" id="scenario-heading">
            Example scenario fixtures
          </h2>

          <HdsTable @caption="Example prototype scenarios">
            <:head as |H|>
              <H.Tr>
                <H.Th>Scenario</H.Th>
                <H.Th>Description</H.Th>
                <H.Th>Status</H.Th>
              </H.Tr>
            </:head>
            <:body as |B|>
              {{#each prototypeScenarios as |scenario|}}
                <B.Tr>
                  <B.Th>
                    <code class="prototype-code">{{scenario.name}}</code>
                  </B.Th>
                  <B.Td>{{scenario.description}}</B.Td>
                  <B.Td>
                    <HdsBadge
                      @text={{scenario.statusText}}
                      @color={{scenario.status}}
                    />
                  </B.Td>
                </B.Tr>
              {{/each}}
            </:body>
          </HdsTable>
        </section>

        {{outlet}}
      </main>
    </Frame.Main>
  </HdsAppFrame>
</template>
