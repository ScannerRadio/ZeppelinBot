<template>
  <div>
    <h1 class="z-title is-1 mb-1">Plugin configuration</h1>
    <p class="mb-1">
      Each plugin in Zeppelin has its own configuration options. In the config editor, you can both set the default config
      and overrides based on specific conditions. Permissions are also just values in the plugin's config, and thus follow
      the same rules with overrides etc. as other options (see <router-link to="/docs/permissions">Permissions</router-link> for more info).
    </p>
    <p class="mb-1">
      Information about each plugin's options can be found on the plugin's page on the sidebar. See <router-link to="/docs/configuration-format">Configuration format</router-link> for an example of a full config.
    </p>

    <h2 class="z-title is-2 mt-2 mb-1">Overrides</h2>
    <p class="mb-1">
      Overrides are the primary mechanism of changing options and permissions based on permission levels, roles, channels, user ids, etc.
    </p>
    <p class="mb-1">
      Here's an example demonstrating different types of overrides:
    </p>

    <CodeBlock lang="yaml" trim="4">
      plugins:
        example_plugin:
          config:
            can_kick: false
            kick_message: "You have been kicked"
            nested:
              value: "Hello"
              other_value: "Foo"
          overrides:
            # Simple permission level based override to allow kicking only for levels 50 and up
            - level: '>=50'
              config:
                can_kick: true
                nested:
                  # This only affects nested.other_value; nested.value is still "Hello"
                  other_value: "Bar"
            # Channel override - don't allow kicking on the specified channel
            - channel: "109672661671505920"
              config:
                can_kick: false
            # Same as above, but for a full category
            - category: "360735466737369109"
              config:
                can_kick: false
            # Multiple channels. If any of them match, this override applies.
            - channel: ["109672661671505920", "570714864285253677"]
              config:
                can_kick: false
            # Match based on a role
            - role: "172950000412655616"
              config:
                can_kick: false
            # Match based on multiple roles. The user must have ALL roles mentioned here for this override to apply.
            - role: ["172950000412655616", "172949857164722176"]
              config:
                can_kick: false
            # Match on user id
            - user: "106391128718245888"
              config:
                kick_message: "You have been kicked by Dragory"
            # Match on multiple conditions
            - channel: "109672661671505920"
              role: "172950000412655616"
              config:
                can_kick: false
            # Match on ANY of multiple conditions
            - channel: "109672661671505920"
              role: "172950000412655616"
              type: "any"
              config:
                can_kick: false
    </CodeBlock>
  </div>
</template>

<script>
  import CodeBlock from "./CodeBlock";

  export default {
    components: { CodeBlock },
  };
</script>
