LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
  function(result) {
    if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      alert('Login was successful with permissions: '
      + result.grantedPermissions.toString());
      onSignIn().then(() => {
        this.props.navigation.navigate("SignedIn");
        this.setState({
          screenLoading: false,
        });
      });
    }
  },
  function(error) {
    alert('Login failed with error: ' + error);
  }
);
