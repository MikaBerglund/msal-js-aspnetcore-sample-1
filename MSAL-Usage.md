Basics usage of `MSAL.js`
=========================

All of the `MSAL.js` stuff in this sample application is contained in the `Home.tsx` component, which you find in `/ClientApp/components/Home.tsx`.

At the core of `MSAL.js` is the `UserAgentApplication` class. You use this class when you want the user to log in, request access tokens on behalf of the user, and when you want the user to log out again.

The minimum information you need to create this instance is:
- **Client ID** - The ID of the Azure AD application that your web application is acting as. To get one, head over to the [Application Registration Portal](https://apps.dev.microsoft.com) and register your application.
- **Authority** - The Azure AD endpoint that takes care of user authentication.


Client ID
---------

This is the ID that identifies your application. All applications need to be registered before they can use Azure AD for authentication. Applications that use `MSAL` will need to be registered on the [Application Registration Portal](https://apps.dev.microsoft.com), because `MSAL` uses only the v2 endpoint of Azure AD. You generally should _not_ use the Azure management portal to register your Azure AD application, since those applications will be using the v1 endpoint of Azure AD.


Authority
---------

This is the endpoint that handles user authentication. The authority has two parts.

    [Azure AD instance]/[Tenant identifier]

There are several instances in use, and for instance in Germany they have a separate, but generally `https://login.microsoftonline.com` should do the trick.

The `tenant identifier` can be any of the following values to support different kinds of authentication.

- `common` - Allows users with both organizational and personal Microsoft accounts to log in.
- `organizations` - Allows only organizational accounts to log in. Normally, this means only Office 365 users (not completely true though)
- `consumers` - Allows only personal Microsoft accounts to sign in.
- `<GUID>` - The guid that represents the tenant ID of an Azure AD (read Office 365) organization. Only users from this tenant can log in.
- `<tenant>.onmicrosoft.com` - The same as in the previous case, but uses the default domain that is associated with all Azure AD organizations.
- `yourcompany.com` - If you register your custom domain with your Azure AD / Office 365 tenant, then you can also use that as tenant identifier.

So, to allow only users from the `bisburger.com` tenant to log in to your application, you would use the following authority.

    https://login.microsoftonline.com/bisburger.com


Read more about the v2.0 protocols on the [Azure documentation site](https://docs.microsoft.com/fi-fi/azure/active-directory/develop/active-directory-v2-protocols).


Creating the `UserAgentApplication` instance
------------------------------------------

To use the `UserAgentApplication` class in your script, you need the following import statement.

    import { UserAgentApplication } from "msal";

If you are building your application using `react`, then you could create the class instance in the constructor of your view component, and keep it available for the entire lifetime of that view.

Creating an instance of this class does not yet invoke any methods for authentication, so it is quite safe to create it. Please also note that you must have an instance of this class available on the view that you are using as your redirect URI (the URL that the user is sent back to after authentication) so that the response from the authentication is handled properly.

This is especially important if you are using the popup login method, since the `UserAgentApplication` class instance is the one that handles for instance closing of the popup dialog.

Create the class instance like this.

    var msalApp = new UserAgentApplication("<clientId>", "<authority>", undefined, {
        redirectUri: "<redirectUri>"
    })

Generally, it is a good idea to define your redirect URI and stick with that, since you need to specify that also with the Azure AD application registration. And the redirect URI needs to be exactly right.


Login
-----

When it is time to log your users in, for instance in response to clicking a button, you simply call the `loginPopup` method. There are other methods for login as well, but the popup method is a good choice because it keeps your user's context and view state.

    msalApp.loginPopup(["user.read])
        .then(idtoken => {
            var usr = msalApp.getUser();
            console.log("Current user", usr);

            // Do whatever you need to do to respond
            // to the user logging in.
        })
        .catch(err => {
            console.warn(err);
        });


Logout
------

Currently there is only one method for logging out, which creates a redirect. To make the user log out use the following code.

    msalApp.logout();


Notes on login using the popup login window
-------------------------------------------

The nice thing with the popup login is that the user does not lose context nor view state when logging in, which normally would happen if the user was redirected to the login page.

Browsers nowadays are quite hard on popups, so you should not invoke the popup login method automatically, but instead, only as a result of user action, for instance when the user clicks a button. Then your popup has a better chance of being shown.


Additional Information
----------------------

- [Azure Active Directory v2 endpoint](https://docs.microsoft.com/fi-fi/azure/active-directory/develop/active-directory-appmodel-v2-overview) - Check out the video on this page. It really describes the general idea of `MSAL` quite nicely.