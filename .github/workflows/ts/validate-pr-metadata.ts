module.exports = async ({github, context, core, glob, io, exec, require}, run_id, title_regex, body_regex, blocking_regex, pull_request) => {
  const PR_TITLE_REGEX        = new RegExp(title_regex)
  const BODY_REGEX            = new RegExp(body_regex)
  const BLOCKING_TITLE_REGEX  = new RegExp(blocking_regex)

  const title =
    pull_request &&
    pull_request.title

  const body =
    pull_request &&
    pull_request.summary

  core.info(title)
  core.info(body)

  const title_valid           = PR_TITLE_REGEX.test(title);
  const body_valid            = BODY_REGEX.test(body);
  const title_not_blocking    = !BLOCKING_TITLE_REGEX.test(title);

  const error_map = [
    { error: `PR title didn't match regex: ${PR_TITLE_REGEX}`, value: title_valid }, 
    { error: `Body title didn't match regex: ${BODY_REGEX}`, value: body_valid }, 
    { error: `Your PR title matched the blocking regex: ${BLOCKING_TITLE_REGEX}`, value: title_not_blocking }, 
  ] 

  var error = '';
  error_map
    .map(elem => {
      if (elem['value'] === false) { 
        error = error.concat(`${error.length > 0 ? ' and ' : ''}${elem['error']}`);
      }
    })

  if (error.length > 0) {
    core.setFailed(error)
  }

  return true;
};

