module.exports = async ({github, context, core, glob, io, exec, require}, run_id) => {
  const PR_TITLE_REGEX        = new RegExp(core.getInput('PR_TITLE_REGEX'))
  const BODY_REGEX            = new RegExp(core.getInput('BODY_REGEX'))
  const BLOCKING_TITLE_REGEX  = new RegExp(core.getInput('BLOCKING_TITLE_REGEX'))

  const title =
    github.context.payload &&
    github.context.payload.pull_request &&
    github.context.payload.pull_request.title

  const body =
    github.context.payload &&
    github.context.payload.pull_request &&
    github.context.payload.pull_request.summary

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
    core.setFailed(
      error
    )
  }

  return result.data;
};

