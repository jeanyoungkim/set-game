%define _binaries_in_noarch_packages_terminate_build   1

Name: nytd-seg-fe
Version: 0.0.1
Release: %_build_code
URL: https://myaccount.nytimes.com
Summary: SEG-FE service
License: NYT proprietary
Group: Applications
autoprov: false
autoreq: no
Requires: nytd-nodejs, nytd-nodejs-npm, nytd-seg-pm2

%description
SEG-FE service

%files
%defattr(-,apache,apache,-)
/opt/nyt/seg-fe/*

%post
