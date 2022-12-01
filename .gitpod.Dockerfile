FROM gitpod/workspace-base:latest

# install slack cli and dependencies
RUN curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash
