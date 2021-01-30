# Unifed Machine Learning

This package is currently used for spam detection machine learning.

## Models
  - `dense` *(trained)* - [Source](https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8)
  - `dense-pooling` *(trained)* - [Source](https://towardsdatascience.com/nlp-detecting-spam-messages-with-tensorflow-part-ii-77826c8f1abf)
  - `twilio-dense` *(trained)* - [Source](https://www.twilio.com/blog/spam-deep-learning-detection-sms-keras-python-twilio)
  - `lstm` *(not trained)* - [Source](https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8)
  - `bi-directional-lstm` *(not trained)* - [Source](https://towardsdatascience.com/nlp-spam-detection-in-sms-text-data-using-deep-learning-b8632db85cc8)

## Artifacts

The `models` directory contains the trained models. All configuration information is stored
within here.

The `meta` directory contains statistics about the training data, used in the report.
This directory is not committed, as it contained hundreds of thousands of lines.
